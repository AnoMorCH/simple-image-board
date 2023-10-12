import { Topic } from "../classes/topic";
import { TopicHtml } from "../classes/html/topic";
import { Post } from "../classes/post";
import { PostHtml } from "../classes/html/post";
import { Auth } from "../classes/auth";
import { User } from "../classes/user";

const id = Topic.getIdFromGetRequest();

// Update info about a topic.
const promisedTopicAnswer = Topic.getPromise(id);
promisedTopicAnswer.then((rawTopicAnswer) => {
  const topicAnswer = JSON.parse(rawTopicAnswer);
  if (topicAnswer["success"]) {
    const topic = JSON.parse(topicAnswer["comment"])[0];
    TopicHtml.setData(topic["name"], topic["description"]);
  }
});

// Add all posts of the topic.
const nicknameToken = User.getNicknameToken();
const promisedNickname = User.getNickname(Auth.isAuthorized(), nicknameToken);
promisedNickname.then((nickname) => {
  const promisedPostsAnswer = Post.getPromise(id);
  promisedPostsAnswer.then(async (rawPostsAnswer) => {
    const postsAnswer = JSON.parse(rawPostsAnswer);
    if (postsAnswer["success"]) {
      const posts = JSON.parse(postsAnswer["comment"]);
      PostHtml.setList(posts, nickname);
      await PostHtml.handleDeleteElements(nicknameToken);
    }
  });
});
