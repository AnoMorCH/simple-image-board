import { Topic } from "../classes/topic.js";
import { TopicHtml } from "../classes/html/topic.js";

const promisedAllTopics = Topic.getAll();
promisedAllTopics.then((rawAllTopics) => {
  const allTopicsAnswer = JSON.parse(rawAllTopics);
  if (allTopicsAnswer["success"]) {
    const allTopics = JSON.parse(allTopicsAnswer["comment"]);
    TopicHtml.setList(allTopics);
  }
});
