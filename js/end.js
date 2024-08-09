const c = console.log.bind();

const scoreEle = document.querySelector("p");
const input = document.querySelector("input");
const button = document.querySelector("button");
const alert = document.querySelector(".alert");

const score = JSON.parse(localStorage.getItem("score"));
scoreEle.innerText = score;

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const saveHandler = () => {
  if (!input.value || !score) {
    alert.style.display = "block";
    alert.style.animation = "alert 0.6s linear";
    setTimeout(() => {
      removeMessage();
    }, 2000);
  } else {
    const finalScore = {
      name: input.value,
      score,
    };

    const repeat = highScores.find((obj) => obj.name === finalScore.name);
    if (repeat != undefined) {
      repeat.score = score;
    } else {
      highScores.push(finalScore);
    }

    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    localStorage.removeItem("score");
    window.location.assign("./index.html");
  }
};
const removeMessage = () => {
  alert.style.display = "none";
  alert.style.animation = "";
};

button.addEventListener("click", saveHandler);
input.addEventListener("focus", removeMessage);
