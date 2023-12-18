document.addEventListener("DOMContentLoaded", async function () {
  let apikey = process.env.REACT_APP_OPENAI_API_KEY;
  let url = "https://api.openai.com/v1/chat/completions";
  let homebtn = document.getElementById("home_button");
  let submitbtn = document.getElementById("submit_button");
  let nextbtn = document.getElementById("next_button");
  let questionfield = document.getElementById("question");
  let option1field = document.getElementById("option1");
  let option2field = document.getElementById("option2");
  let option3field = document.getElementById("option3");
  let option4field = document.getElementById("option4");
  let answermsg = document.getElementById("answer");
  let correctmsg = document.getElementById("correct");
  let wrongmsg = document.getElementById("wrong");
  let optionsdiv = document.getElementById("options_div");
  let optionselements = optionsdiv.querySelectorAll("p.option");
  let scorevalue = document.getElementById("score");
  let result = document.getElementById("result");
  let playagain_btn = document.getElementById("playagain");
  let scorenum = document.getElementById("scorenumtext");
  let bodyelement = document.body;
  let correctindex;
  let selectedindex;
  let option1;
  let option2;
  let option3;
  let option4;
  let correctnum = 0;
  let totalnum = 0;
  let overlay = document.createElement("div");
  overlay.style.content = "";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(128, 128, 128, 0.6)";
  homebtn.addEventListener("click", function () {
    window.location.href = "index.html";
  });
  playagain_btn.addEventListener("click", function () {
    window.location.href = "index.html";
  });
  const storedTopicValue = localStorage.getItem("topicvalue");
  const storedNumValue = localStorage.getItem("numbervalue");
  await getquestion();
  scorevalue.innerHTML = `Question 1 of ${storedNumValue}`;
  async function getquestion() {
    try {
      questionfield.innerHTML = "Loading...";
      option1field.innerHTML = "Loading...";
      option2field.innerHTML = "Loading...";
      option3field.innerHTML = "Loading...";
      option4field.innerHTML = "Loading...";
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
              content: `Give a question and answer that you have never asked before and is extremely tough which is not likely to change after 2021 (MAKE SURE THE ANSWER IS CORRECT) on the topic ${storedTopicValue} in this format Q: What is the capital of France?
                  1. Paris
                  2. Delhi
                  3. London
                  4. Beijing
                  Answer: 1
                  REMEMBER TO STICK TO THIS FORMAT NOTHING ELSE dont add any indentation in the options and answer`,
            },
          ],
        }),
      });
      const data = await response.json();
      const content = data.choices[0].message.content;
      const pattern =
        /Q: (.+?)\n?(1\. .+?)\n?(2\. .+?)\n?(3\. .+?)\n?(4\. .+?)\n?Answer: (\d+)/s;
      const matches = content.match(pattern);
      if (matches) {
        const question = matches[1];
        option1 = { number: "1", text: matches[2] };
        option2 = { number: "2", text: matches[3] };
        option3 = { number: "3", text: matches[4] };
        option4 = { number: "4", text: matches[5] };
        correctindex = matches[6].toString();
        questionfield.innerHTML = question;
        option1field.innerHTML = option1.text;
        option2field.innerHTML = option2.text;
        option3field.innerHTML = option3.text;
        option4field.innerHTML = option4.text;
      } else {
        console.log("Invalid format");
      }
    } catch (error) {
      console.log("Error");
    }
  }
  option1field.addEventListener("click", function () {
    console.log("clicked");
    selectedindex = 1;
    option1field.style.backgroundColor = "#49cdff";
    option2field.style.backgroundColor = "#1884ffe9";
    option3field.style.backgroundColor = "#1884ffe9";
    option4field.style.backgroundColor = "#1884ffe9";
  });
  option2field.addEventListener("click", function () {
    console.log("clicked");
    selectedindex = 2;
    option2field.style.backgroundColor = "#49cdff";
    option1field.style.backgroundColor = "#1884ffe9";
    option3field.style.backgroundColor = "#1884ffe9";
    option4field.style.backgroundColor = "#1884ffe9";
  });
  option3field.addEventListener("click", function () {
    console.log("clicked");
    selectedindex = 3;
    option3field.style.backgroundColor = "#49cdff";
    option2field.style.backgroundColor = "#1884ffe9";
    option1field.style.backgroundColor = "#1884ffe9";
    option4field.style.backgroundColor = "#1884ffe9";
  });
  option4field.addEventListener("click", function () {
    console.log("clicked");
    selectedindex = 4;
    option4field.style.backgroundColor = "#49cdff";
    option2field.style.backgroundColor = "#1884ffe9";
    option3field.style.backgroundColor = "#1884ffe9";
    option1field.style.backgroundColor = "#1884ffe9";
  });
  submitbtn.addEventListener("click", function () {
    totalnum++;
    optionselements.forEach((element) => {
      element.style.display = "none";
    });
    submitbtn.style.display = "none";
    answermsg.style.display = "block";
    if (selectedindex == correctindex) {
      correctnum++;
      correctmsg.style.display = "block";
      switch (correctindex) {
        case "1":
          console.log("in");
          console.log(option1.text);
          answermsg.innerHTML = "The correct answer is: " + option1.text;
          break;
        case "2":
          console.log("in");
          console.log(option2.text);
          answermsg.innerHTML = "The correct answer is: " + option2.text;
          break;
        case "3":
          console.log("in");
          console.log(option3.text);
          answermsg.innerHTML = "The correct answer is: " + option3.text;
          break;
        case "4":
          console.log("in");
          console.log(option4.text);
          answermsg.innerHTML = "The correct answer is: " + option4.text;
          break;
      }
      confetti();
    } else {
      wrongmsg.style.display = "block";
      switch (correctindex) {
        case "1":
          console.log("in");
          answermsg.innerHTML = "The correct answer is: " + option1.text;
          break;
        case "2":
          console.log("in");
          answermsg.innerHTML = "The correct answer is: " + option2.text;
          break;
        case "3":
          console.log("in");
          answermsg.innerHTML = "The correct answer is: " + option3.text;
          break;
        case "4":
          console.log("in");
          answermsg.innerHTML = "The correct answer is: " + option4.text;
          break;
      }
    }

    nextbtn.style.display = "block";
  });
  nextbtn.addEventListener("click", async function () {
    nextbtn.style.display = "none";
    optionselements.forEach((element) => {
      element.style.display = "block";
    });
    submitbtn.style.display = "block";
    correctmsg.style.display = "none";
    wrongmsg.style.display = "none";
    answermsg.style.display = "none";
    scorevalue.innerHTML = `Question ${totalnum + 1} of ${storedNumValue}`;
    if (totalnum == storedNumValue) {
      result.show();
      bodyelement.appendChild(overlay);
      scorenum.innerHTML = correctnum;
      var duration = 15 * 1000;
      var animationEnd = Date.now() + duration;
      var defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 10000,
      };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);
    }
    await getquestion();
  });
});
