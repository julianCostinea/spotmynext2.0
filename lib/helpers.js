import React from "react";
import Tag from "../components/Tag/Tag";

export function convertTags(tags, secondary, fetchedData) {
  if (secondary) {
    if (fetchedData) {
      return fetchedData.secondaryTags.split(",").map((tag) => (
        <Tag key={tag} secondaryTag>
          {tag}
        </Tag>
      ));
    }
    return tags.split(",").map((tag) => (
      <Tag key={tag} secondaryTag>
        {tag}
      </Tag>
    ));
  }
  if (fetchedData) {
    return fetchedData.mainTags
      .split(",")
      .map((tag) => <Tag key={tag}>{tag}</Tag>);
  }
  return tags.split(",").map((tag) => <Tag key={tag}>{tag}</Tag>);
}

export function fetchVoteRecommendations(collection, data) {
  fetch(`/api/${collection}/voteItem`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((results) => {
      if (results.result.length === 0) {
        // console.log("Something went wrong");
      }
    })
    .catch((error) => {
      // console.log(error)
    });
}
