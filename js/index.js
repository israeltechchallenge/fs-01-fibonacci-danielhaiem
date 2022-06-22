const fibTextEl = document.getElementById("fib-text-el");
const inputEl = document.getElementById("input-el");
const calcBtn = document.getElementById("calc-btn");

const FIB_URL = "http://localhost:5050/fibonacci/";

calcBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let userInput = inputEl.value;
  calcFib(userInput);
});

function calcFib(num) {
  fetch(`${FIB_URL}${num}`).then((response) => {
    response.json().then((data) => {
      fibTextEl.innerText = data.result;
    });
  });
}
