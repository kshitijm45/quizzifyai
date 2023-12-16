import gettopic from "./script.js";

document.addEventListener("DOMContentLoaded", async function () {
  let apikey = "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";
  let url = "https://api.openai.com/v1/chat/completions";
  let homebtn = document.getElementById("home_button");
  let questionfield = document.getElementById("question");
  let option1field = document.getElementById("option1");
  let option2field = document.getElementById("option2");
  let option3field = document.getElementById("option3");
  let option4field = document.getElementById("option4");
  let correctindex;
  homebtn.addEventListener("click", function () {
    window.location.href = "index.html";
  });
  let topicvalue = gettopic();
  console.log(topicvalue);
  //await getquestion();

  async function getquestion() {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apikey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Give a question and answer on the topic ${window.topicvalue} in this format Q: What is the capital of France?
                    1. Paris
                    2. Delhi
                    3. London
                    4. Beijing
                    Answer: 1`,
            },
          ],
        }),
      });
      const data = await response.json();
      const content = data.choices[0].message.content;
      const pattern =
        /Q: (.+?)\n1\. (.+?)\n2\. (.+?)\n3\. (.+?)\n4\. (.+?)\nAnswer: (\d+)/s;
      const matches = content.match(pattern);
      console.log(matches);
      if (matches) {
        const question = matches[1];
        const option1 = { number: "1", text: matches[2] };
        const option2 = { number: "2", text: matches[3] };
        const option3 = { number: "3", text: matches[4] };
        const option4 = { number: "4", text: matches[5] };
        correctindex = matches[6];
        questionfield.innerHTML = question;
        option1field.innerHTML = option1.text;
        option2field.innerHTML = option2.text;
        option3field.innerHTML = option3.text;
        option4field.innerHTML = option4.text;
        console.log("got");
      } else {
        console.log("Invalid format");
      }
    } catch (error) {
      console.log("Error");
    }
  }
});
