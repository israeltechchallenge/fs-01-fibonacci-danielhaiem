const fibTextEl = document.getElementById("fib-text-el");
const inputEl = document.getElementById("input-el");
const calcBtn = document.getElementById("calc-btn");
const input = document.querySelector("input");
const spinnerBtn = document.querySelector("#spinner-btn");

const FIB_URL = "http://localhost:5050/fibonacci/";

calcBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let userInput = inputEl.value;
  fibTextEl.innerText = "";
  if (!userInput) {
    return false;
  } else if (userInput > 50) {
    input.classList.add("is-invalid");
  } else {
    input.classList.remove("is-invalid");
    return calcFib(userInput);
  }
});

function calcFib(num) {
  spinnerBtn.classList.remove("d-none");
  fetch(`${FIB_URL}${num}`)
    .then((response) => {
      if (!response.ok) {
        response.text().then((errorText) => {
          spinnerBtn.classList.add("d-none");
          fibTextEl.classList.remove(
            "text-decoration-underline",
            "fw-bold",
            "fs-4"
          );
          fibTextEl.classList.add("text-danger", "fs-6");
          fibTextEl.innerText = "Server Error: " + errorText;
        });
      } else {
        spinnerBtn.classList.add("d-none");
        fibTextEl.classList.remove("text-danger", "fs-6");
        fibTextEl.classList.add("text-decoration-underline", "fw-bold", "fs-4");

        return response.json();
      }
    })
    .then((data) => {
      spinnerBtn.classList.add("d-none");
      fibTextEl.classList.remove("text-danger", "fs-6");
      fibTextEl.classList.add("text-decoration-underline", "fw-bold", "fs-4");
      fibTextEl.innerText = data.result;
    });
}
