"use strict";

/*
3. Assignment (Calculator):
*/

/*
1. / opens search? and doesn't work
2. Enter presses 5?
3. Minus doesn't work
*/

const display = document.querySelector(".calc__display");

const digits = document.querySelectorAll(".calc__digit");
const operators = document.querySelectorAll(".calc__operators");

const equal = document.querySelector(".calc__equal--btn");
const clear = document.querySelector(".calc__clear--btn");
const float = document.querySelector(".calc__float--btn");
const minus = document.querySelector(".calc__minus--btn");
const backspace = document.querySelector(".calc__backspace--btn");

const operate = function () {
  const operator = activeOperator;
  const num1 = +previousVariable;
  const num2 = +displayVariable;
  switch (operator) {
    case "+":
      return (num1 * 1000 + num2 * 1000) / 1000;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
  }
};

let previousVariable = "";
let displayVariable = "";
let activeOperator = "";
let pressedEqual = false;

/*---------------------------------------------------------------------------------------*/
/* Utility */

const displayLengthCorrect = function () {
  const length = displayVariable.length;
  if (length > 15) {
    display.textContent =
      "..." + displayVariable.substring(length - 15, length - 1);
  }
};
/*---------------------------------------------------------------------------------------*/

/* Digits listeners - 1 2 3 4 5 6 7 8 9 0*/

const handleNumbers = function (num) {
  if (pressedEqual) {
    displayVariable = num;
    display.textContent = displayVariable;
    pressedEqual = false;
  } else {
    displayVariable = displayVariable + num;
    display.textContent = displayVariable;
  }
  displayLengthCorrect();
};

[...digits].forEach((digit) =>
  digit.addEventListener("click", (e) => handleNumbers(e.target.textContent))
);

/*---------------------------------------------------------------------------------------*/

/* Operators listeners - + - * / */

const handleOperators = function (operator) {
  if (previousVariable === "" && displayVariable === "") {
    return;
  }
  if (activeOperator) {
    displayVariable = operate();
    display.textContent = displayVariable;
  }

  activeOperator = operator;
  previousVariable = displayVariable;
  displayVariable = "";
  pressedEqual = false;
};

[...operators].forEach((operator) =>
  operator.addEventListener("click", (e) =>
    handleOperators(e.target.textContent.trim())
  )
);

/*---------------------------------------------------------------------------------------*/

/* Making decimals - . */
const floatFunc = function () {
  if (pressedEqual || displayVariable.includes(".")) {
    return;
  }

  displayVariable = `${displayVariable}.`;
  display.textContent = displayVariable;

  displayLengthCorrect();
};

float.addEventListener("click", floatFunc);

/* Making positive/negative - +/- */

const minusFunc = function () {
  if (pressedEqual) return;
  if (displayVariable.includes("-")) {
    displayVariable = displayVariable.substring(1);
  } else {
    displayVariable = `-${displayVariable}`;
  }
  display.textContent = displayVariable;

  displayLengthCorrect();
};

minus.addEventListener("click", minusFunc);

/* Deleting the last digit  - <= >*/

const backspaceFunc = function () {
  if (displayVariable.length > 1) {
    displayVariable = displayVariable.substring(0, displayVariable.length - 1);
    display.textContent = displayVariable;
    displayLengthCorrect();
    return;
  } else if (previousVariable !== "") {
    displayVariable = "";
    display.textContent = "0";
    return;
  }
  displayVariable = "";
  display.textContent = "Start";
};

backspace.addEventListener("click", backspaceFunc);

/* Computing */
const equalFunc = function () {
  if (!activeOperator) return;

  displayVariable = operate();
  display.textContent = displayVariable;
  activeOperator = "";
  pressedEqual = true;

  displayLengthCorrect();

  if (displayVariable == Infinity || displayVariable == -Infinity) {
    display.textContent = "You can't divide by 0";
  }
};

equal.addEventListener("click", equalFunc);

/* Delete all - AC */

const clearFunc = function () {
  previousVariable = "";
  displayVariable = "";
  activeOperator = "";
  display.textContent = "Start";
  pressedEqual = false;

  displayLengthCorrect();
};

clear.addEventListener("click", clearFunc);

//Keyboard support

document.addEventListener("keypress", (event) => {
  const { key } = event;
  if (
    key === "1" ||
    key === "2" ||
    key === "3" ||
    key === "4" ||
    key === "5" ||
    key === "6" ||
    key === "7" ||
    key === "8" ||
    key === "9" ||
    key === "0"
  ) {
    handleNumbers(key);
  }
  if (key === "+" || key === "/" || key === "*") {
    handleOperators(key);
  }
  if (key === "-") {
    if (displayVariable === "") {
      minusFunc();
    } else {
      handleOperators(key);
    }
  }
  if (key === ".") {
    floatFunc();
  }
  if (key === "=" || key === "Enter") {
    equalFunc();
  }
});

document.addEventListener("keydown", (event) => {
  const { key } = event;
  if (key === "Backspace" || key === "Delete") {
    backspaceFunc();
  }
});

document.addEventListener("keypress", (event) => {
  console.log(event);
});
