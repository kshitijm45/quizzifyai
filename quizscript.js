document.addEventListener("DOMContentLoaded", async function () {
  let apikey = "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";
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
  let correctindex;
  let selectedindex;
  let option1;
  let option2;
  let option3;
  let option4;
  homebtn.addEventListener("click", function () {
    window.location.href = "index.html";
  });
  const storedTopicValue = localStorage.getItem("topicvalue");
  if (storedTopicValue) {
    // Use storedTopicValue as needed
    console.log("Topic Value:", storedTopicValue);
  } else {
    console.log("Topic Value not found");
  }
  await getquestion();
  let usedQuestions = new Set();
  async function getquestion() {
    try {
      console.log(storedTopicValue);
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
              content: `Give a unique and interesting question and answer which is not likely to change after 2021 (MAKE SURE THE ANSWER IS CORRECT) on the topic ${storedTopicValue} in this format Q: What is the capital of France?
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
      console.log(content);
      const pattern =
        /Q: (.+?)\n?(1\. .+?)\n?(2\. .+?)\n?(3\. .+?)\n?(4\. .+?)\n?Answer: (\d+)/s;
      const matches = content.match(pattern);
      console.log(matches);
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
        console.log("got");
        console.log(correctindex);
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
    optionselements.forEach((element) => {
      element.style.display = "none";
    });
    submitbtn.style.display = "none";
    answermsg.style.display = "block";
    if (selectedindex == correctindex) {
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
    await getquestion();
  });
});
