import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <div id="recommendationPreviewOverlay">
          </div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
