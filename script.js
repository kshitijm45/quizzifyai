let homebtn = document.getElementById("home_button");
let startbtn = document.getElementById("start_button");
let topic = document.getElementById("topic_input");
let numberofq = document.getElementById("number_input");
let topicvalue;
let numbervalue;

homebtn.addEventListener("click", function () {
  window.location.href = "index.html";
});

startbtn.addEventListener("click", function () {
  topicvalue = topic.value;
  numbervalue = numberofq.value;
  localStorage.setItem("numbervalue", numbervalue);
  localStorage.setItem("topicvalue", topicvalue);
  window.location.href = "quiz.html";
});
