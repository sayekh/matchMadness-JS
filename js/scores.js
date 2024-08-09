const c = console.log.bind();

const list = document.querySelector("ol");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const content = highScores.map((score, index) => {
  return `
    <li>
        <span>${index + 1}</span>
        <p>${score.name}</p>
        <span>${score.score}</span>
    </li>
    `;
});
list.innerHTML = content.join("");
