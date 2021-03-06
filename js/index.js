const fibTextEl = document.getElementById("fib-text-el");
const inputEl = document.getElementById("input-el");
const calcBtn = document.getElementById("calc-btn");
const input = document.querySelector("input");
const spinner1El = document.querySelector("#spinner1-el");
const spinner2El = document.querySelector("#spinner2-el");
const renderResult = document.getElementById("render-result");
const over50 = document.getElementById("over50");
const checkbox = document.getElementById("flexCheckDefault");

const FIB_URL = "http://localhost:5050/fibonacci/";
const RENDER_URL = "http://localhost:5050/getFibonacciResults";

const over50Error = `<p class="fs-6 d-inline">Can’t be larger than 50</p>`;

function error50Add() {
  over50.classList.remove("d-none");
  over50.innerHTML = over50Error;
}

function error50Remove() {
  over50.classList.add("d-none");
}

function spinner1On() {
  spinner1El.classList.add("d-none");
  spinner2El.classList.add("d-none");
}

function spinner1Off() {
  spinner1El.classList.remove("d-none");
  spinner2El.classList.remove("d-none");
}

function dangerAdd() {
  inputEl.classList.add("text-danger");
}

function dangerRemove() {
  inputEl.classList.remove("text-danger");
}

function invalidAdd() {
  input.classList.add("is-invalid");
}

function invalidRemove() {
  input.classList.remove("is-invalid");
}

function resultBsAdd() {
  fibTextEl.classList.add("text-decoration-underline", "fw-bold", "fs-4");
}

function resultBsRemove() {
  fibTextEl.classList.remove("text-decoration-underline", "fw-bold", "fs-4");
}

function errorCssAdd() {
  fibTextEl.classList.add("text-danger", "fs-6");
}

function errorCssRemove() {
  fibTextEl.classList.remove("text-danger", "fs-6");
}

calcBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let userInput = inputEl.value;
  fibTextEl.innerText = "";
  if (!userInput) {
    dangerRemove();
    return false;
  } else if (checkbox.checked == true) {
    if (userInput < 0) {
      invalidAdd();
      dangerAdd();
      error50Remove();
    } else if (userInput > 50) {
      invalidAdd();
      dangerAdd();
      error50Add();
    } else {
      dangerRemove();
      invalidRemove();
      calcFibServer(userInput);
      renderFib();
    }
  } else {
    if (userInput < 0) {
      invalidAdd();
      dangerAdd();
      error50Remove();
      errorCssRemove();
    } else if (userInput > 50) {
      invalidAdd();
      dangerAdd();
      error50Add();
      errorCssRemove();
    } else {
      dangerRemove();
      invalidRemove();
      errorCssRemove();
      calcFibManual(userInput);
    }
  }
});

function calcFibServer(num) {
  spinner1Off();

  fetch(`${FIB_URL}${num}`)
    .then((response) => {
      if (!response.ok) {
        response.text().then((errorText) => {
          spinner1On();

          resultBsRemove();
          errorCssAdd();
          fibTextEl.innerText = "Server Error: " + errorText;
        });
      } else {
        spinner1On();

        errorCssRemove();
        resultBsAdd();

        return response.json();
      }
    })
    .then((data) => {
      spinner1On();

      errorCssRemove();
      resultBsAdd();
      fibTextEl.innerText = data.result;
    });
}

function calcFibManual(num) {
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
  resultBsAdd();
  let fibText = result;
  fibTextEl.innerText = fibText;
}

function renderFib() {
  fetch(`${RENDER_URL}`)
    .then((response) => response.json())
    .then((data) => {
      let listResult = "";
      for (let variable of data.results.sort(
        (a, b) => b["createdDate"] - a["createdDate"]
      )) {
        let listMessage = `<div class="fs-4 border-bottom border-secondary pb-3 mb-3 letter-spacing"> 
        The Fibonnaci Of <b>${variable.number}</b> is <b>${
          variable.result
        }</b>. Calculated at: ${new Date(variable.createdDate)}</div>`;
        listResult += listMessage;
      }
      renderResult.innerHTML = listResult;
    });
}
renderFib();
