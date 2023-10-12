import { Topic } from "../classes/topic";
import { TopicHtml } from "../classes/html/topic";
import { Post } from "../classes/post";
import { PostHtml } from "../classes/html/post";
import { Auth } from "../classes/auth";
import { User } from "../classes/user";
import { Datetime } from "../classes/datetime";
import { reload } from "../helper";

const topicId = Topic.getIdFromGetRequest();
const nicknameToken = User.getNicknameToken();

updateTopicInfo(topicId);
addPostsToTopic(topicId, nicknameToken);
implementPostSendingEvent(nicknameToken);

function updateTopicInfo(topicId) {
  const promisedTopicAnswer = Topic.getPromise(topicId);
  promisedTopicAnswer.then((rawTopicAnswer) => {
    const topicAnswer = JSON.parse(rawTopicAnswer);
    if (topicAnswer["success"]) {
      const topic = JSON.parse(topicAnswer["comment"])[0];
      TopicHtml.setData(topic["name"], topic["description"]);
    }
  });
}

function addPostsToTopic(topicId, nicknameToken) {
  const promisedNickname = User.getNickname(Auth.isAuthorized(), nicknameToken);
  promisedNickname.then((nickname) => {
    const promisedPostsAnswer = Post.getPromise(topicId);
    promisedPostsAnswer.then(async (rawPostsAnswer) => {
      const postsAnswer = JSON.parse(rawPostsAnswer);
      if (postsAnswer["success"]) {
        const posts = JSON.parse(postsAnswer["comment"]);
        PostHtml.setList(posts, nickname);
        await PostHtml.handleDeleteElements(nicknameToken);
      }
    });
  });
}

function implementPostSendingEvent(nicknameToken) {
  const sendPostForm = document.getElementById("send-post-form");

  sendPostForm.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent the page from reloading on submit of the form
    const textElement = document.getElementById("post-text");
    const topicId = Topic.getIdFromGetRequest();
    const text = textElement.value;
    const date = new Datetime().get();
    Post.create(nicknameToken, topicId, text, date);
    reload();
  });
}
