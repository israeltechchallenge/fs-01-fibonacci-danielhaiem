const fibTextEl = document.getElementById("fib-text-el");

let fib = [0, 1];

function getFibText(num) {
  for (let i = fib.length; i < num; i++) {
    fib[i] = fib[i - 2] + fib[i - 1];
  }

  let last2 = fib.slice(-2);

  let result = "";

  if (num < 2) {
    result = 0;
  } else {
    result = last2.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );
  }

  let fibText = `The Fibonacci of ${num} is ${result}`;
  fibTextEl.innerText = fibText;
}

getFibText(19);
