let num = 3;
let result = 2;
let fibText = `The Fibonacci of ${num} is ${result}`;

const fibTextEl = document.getElementById("fib-text-el");

function getFibText() {
  fibTextEl.innerText = fibText;
}

getFibText();
