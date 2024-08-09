import { fetchData } from "../utils/httpReq.js";

const c = console.log.bind();
const englishBoxes = document.querySelectorAll(".english-box button");
const frenchBoxes = document.querySelectorAll(".french-box button");
const scoreText = document.querySelector("#score");
const nextButton = document.querySelector("#next-button");
const finishButton = document.querySelector("#finish-button");
const buttons = document.querySelectorAll("button");
const loader = document.querySelector("#loader");
const errorText = document.querySelector("#error");

const CORRECT_BONUS = 10;
let words = [];
let currentWords = [];
let eId = 0;
let fId = 0;
let score = 0;

const generateId = () => {
  return Math.ceil(Math.random() * (words.length - 1));
};

const loadWords = async () => {
  try {
    words = await fetchData();
    start();
  } catch (error) {
    c(error);
    setTimeout(() => {
      loader.style.display = "none";
    }, 2000);
    setTimeout(() => {
      errorText.style.display = "block";
    }, 2000);
  }
};
const start = () => {
  setWords();
  loader.style.display = "none";
  container.style.display = "block";
};
const setWords = () => {
  clearData();
  for (let i = 0; i < 5; i++) {
    currentWords.push(words[generateId()]);
  }
  setEnglishWords();
  setFrenchhWords();
};
const setEnglishWords = () => {
  let i = 0;
  currentWords.forEach((word) => {
    const { id, english } = word;
    englishBoxes[i].innerHTML = english;
    englishBoxes[i].dataset.id = id;
    ++i;
  });
};
const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
const setFrenchhWords = () => {
  let i = 0;
  const newCurWords = shuffleArray(currentWords);
  newCurWords.forEach((word) => {
    const { id, french } = word;
    frenchBoxes[i].innerHTML = french;
    frenchBoxes[i].dataset.id = id;
    ++i;
  });
};
const checkEAnswer = (event) => {
  removeEnglishClasses();
  if (!fId) {
    eId = event.target.dataset.id;
    event.target.classList.add("correct");
  } else if (fId == event.target.dataset.id) {
    event.target.classList.add("correct");
    removeWord();
  } else {
    event.target.classList.add("incorrect");
    setTimeout(() => {
      event.target.classList.remove("incorrect");
    }, 1000);
  }
};
const checkFAnswer = (event) => {
  removeFrenchClasses();
  if (!eId) {
    fId = event.target.dataset.id;
    event.target.classList.add("correct");
  } else if (eId == event.target.dataset.id) {
    event.target.classList.add("correct");
    removeWord();
  } else {
    event.target.classList.add("incorrect");
    setTimeout(() => {
      event.target.classList.remove("incorrect");
    }, 5800);
  }
};
const removeWord = () => {
  setTimeout(() => {
    englishBoxes.forEach((button) => {
      if (button.classList == "correct") {
        button.style.opacity = "0";
        button.style.visibility = "hidden";
      }
    });
    frenchBoxes.forEach((button) => {
      if (button.classList == "correct") {
        button.style.opacity = "0";
        button.style.visibility = "hidden";
      }
    });
    eId = 0;
    fId = 0;
    score += CORRECT_BONUS;
    showScore(score);
  }, 500);
};
const showScore = (score) => {
  scoreText.innerText = score;
};
const clearData = () => {
  currentWords = [];
  removeEnglishClasses();
  removeFrenchClasses();
};
const removeEnglishClasses = () => {
  englishBoxes.forEach((button) => {
    button.classList = "";
  });
};
const removeFrenchClasses = () => {
  frenchBoxes.forEach((button) => {
    button.classList = "";
  });
};
const nextHandler = () => {
  buttons.forEach((button) => {
    button.style.opacity = "1";
    button.style.visibility = "visible";
  });
  setWords();
};
const finishHandler = () => {
  localStorage.setItem("score", JSON.stringify(score));
  window.location.assign("end.html");
};
//Time Limit Part

// EventListeners
window.addEventListener("load", loadWords);
englishBoxes.forEach((button) => {
  button.addEventListener("click", (event) => checkEAnswer(event));
});
frenchBoxes.forEach((button) => {
  button.addEventListener("click", (event) => checkFAnswer(event));
});
nextButton.addEventListener("click", nextHandler);
finishButton.addEventListener("click", finishHandler);
