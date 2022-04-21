const mail = require("@sendgrid/mail");

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);

    if (body.title === "") {
      res.status(502).send({
        message: "Title empty. Could not send mail.",
      });
      return;
    }

    const secretKey = process.env.SECRET_RECAPTCHA_KEY;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${body.recaptcha}`;

    const message = `
        Title: ${body.title} \r\n
        mainTags: ${body.mainTags} \r\n
        secondaryTags: ${body.secondaryTags} \r\n
      `;
    try {
      const recaptchaResponse = await fetch(verifyUrl, {
        method: "POST",
      });
      const parsedRecaptchaResponse = await recaptchaResponse.json();
      if (!parsedRecaptchaResponse.success || parsedRecaptchaResponse.score < 0.4) {
        throw new Error(
          "Could not send mail."
        );
      }

      await mail.send({
        to: "julian.costinea@gmail.com",
        from: "Julian@go-work.dk",
        subject: `New reccomendation sent by user`,
        text: message,
        html: message.replace(/\r\n/g, "<br>"),
      });
      res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(error.code ?? 502).send({
        message:
          error.message ?? "Mail couldn't be sent. Please try again later",
      });
    }
  }
}
