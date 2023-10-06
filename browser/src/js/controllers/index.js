import { Topic } from "../classes/topic";

const promisedAllTopics = Topic.getAll();
promisedAllTopics.then((rawAllTopics) => {
  const jsonAllTopicsAnswer = JSON.parse(rawAllTopics);
  if (jsonAllTopicsAnswer["success"]) {
    const jsonAllTopics = JSON.parse(jsonAllTopicsAnswer["comment"]);
    const topicsPlaceholder = document.getElementById("topics");
    Topic.setAllTo(topicsPlaceholder, jsonAllTopics);
  }
});
