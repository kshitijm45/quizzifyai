let apikey = "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";
let url = "https://api.openai.com/v1/chat/completions";
let homebtn = document.getElementById("home_button");
let startbtn = document.getElementById("start_button");
let topic = document.getElementById("topic_input");
let numberofq = document.getElementById("number_input");
let topicvalue;

homebtn.addEventListener("click", function () {
  window.location.href = "index.html";
});

startbtn.addEventListener("click", function () {
  topicvalue = topic.value;
  window.location.href = "quiz.html";
});

export default function gettopic() {
  return topicvalue;
}
