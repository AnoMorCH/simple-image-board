import { Topic } from "../classes/topic";
import { TopicHtml } from "../classes/html/topic";

const id = Topic.getIdFromGetRequest();
const promisedTopicAnswer = Topic.getPromise(id);
promisedTopicAnswer.then((rawTopicAnswer) => {
  const topicAnswer = JSON.parse(rawTopicAnswer);
  if (topicAnswer["success"]) {
    const topic = JSON.parse(topicAnswer["comment"])[0];
    TopicHtml.setData(topic["name"], topic["description"]);
  }
});
