import { Topic } from "../classes/topic";
import { TopicHtml } from "../classes/html/topic";
import { Post } from "../classes/post";
import { PostHtml } from "../classes/html/post";

const id = Topic.getIdFromGetRequest();

const promisedTopicAnswer = Topic.getPromise(id);
promisedTopicAnswer.then((rawTopicAnswer) => {
  const topicAnswer = JSON.parse(rawTopicAnswer);
  if (topicAnswer["success"]) {
    const topic = JSON.parse(topicAnswer["comment"])[0];
    TopicHtml.setData(topic["name"], topic["description"]);
  }
});

const promisedPostsAnswer = Post.getPromise(id);
promisedPostsAnswer.then((rawPostsAnswer) => {
  const postsAnswer = JSON.parse(rawPostsAnswer);
  if (postsAnswer["success"]) {
    const posts = JSON.parse(postsAnswer["comment"]);
    PostHtml.setList(posts);
  }
});