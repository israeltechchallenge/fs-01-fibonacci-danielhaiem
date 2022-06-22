const fibTextEl = document.getElementById("fib-text-el");
const inputEl = document.getElementById("input-el");
const calcBtn = document.getElementById("calc-btn");

// let fib = [0, 1];

calcBtn.addEventListener("click", function () {
  let userInput = inputEl.value;
  calcFib(userInput);
});

function calcFib(num) {
  let fib = [0, 1];
  for (let i = fib.length; i < num; i++) {
    fib[i] = fib[i - 2] + fib[i - 1];
  }

  let last2 = fib.slice(-2);

  let result = "";

  if (num < 1) {
    result = 0;
  } else {
    result = last2.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );
  }

  let fibText = result;
  fibTextEl.innerText = fibText;
}
