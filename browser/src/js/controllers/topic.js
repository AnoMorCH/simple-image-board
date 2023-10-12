import { Topic } from "../classes/topic";
import { TopicHtml } from "../classes/html/topic";
import { Post } from "../classes/post";
import { PostHtml } from "../classes/html/post";
import { Auth } from "../classes/auth";
import { User } from "../classes/user";
import { Datetime } from "../classes/datetime";
import { reload } from "../helper";

const id = Topic.getIdFromGetRequest();

// TODO. Think of creating of a special function for the code below.
// Update info about a topic.
const promisedTopicAnswer = Topic.getPromise(id);
promisedTopicAnswer.then((rawTopicAnswer) => {
  const topicAnswer = JSON.parse(rawTopicAnswer);
  if (topicAnswer["success"]) {
    const topic = JSON.parse(topicAnswer["comment"])[0];
    TopicHtml.setData(topic["name"], topic["description"]);
  }
});

// TODO. Think of creating of a special function for the code below.
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

// TODO. Think of creating of a special function for the code below.
// Send a post to a topic.
const sendPostForm = document.getElementById("send-post-form");

sendPostForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent the page from reloading on submit of the form
  const textElement = document.getElementById("post-text");
  const nicknameToken = User.getNicknameToken();
  const topicId = Topic.getIdFromGetRequest();
  const text = textElement.value;
  const date = new Datetime().get();
  Post.create(nicknameToken, topicId, text, date);
  reload();
});
