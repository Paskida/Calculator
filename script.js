"use strict";

/*
 */

class Calculator {
  constructor() {
    this.previousVariable = "";
    this.displayVariable = "";
    this.activeOperator = "";
    this.pressedEqual = false;
    this.num = "";
  }

  //Utility
  displayLengthCorrect() {
    const length = this.displayVariable.length;
    if (length > 15) {
      display.textContent =
        "..." + this.displayVariable.substring(length - 15, length - 1);
    }
  }

  //Basic math operations + - * /
  operate() {
    const operator = this.activeOperator;
    const num1 = +this.previousVariable;
    const num2 = +this.displayVariable;
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
  }

  handleNumbers(num) {
    if (this.pressedEqual) {
      this.displayVariable = num;
      display.textContent = this.displayVariable;
      this.pressedEqual = false;
    } else {
      this.displayVariable = this.displayVariable + num;
      display.textContent = this.displayVariable;
    }
    this.displayLengthCorrect();
  }

  handleOperators(operator) {
    if (this.previousVariable === "" && this.displayVariable === "") {
      return;
    }
    if (this.activeOperator) {
      this.displayVariable = this.operate();
      display.textContent = this.displayVariable;
    }

    this.activeOperator = operator;
    this.previousVariable = this.displayVariable;
    this.displayVariable = "";
    this.pressedEqual = false;
  }

  floatFunc() {
    if (this.pressedEqual || this.displayVariable.includes(".")) {
      return;
    }

    this.displayVariable = `${this.displayVariable}.`;
    display.textContent = this.displayVariable;

    this.displayLengthCorrect();
  }

  minusFunc() {
    if (this.pressedEqual) return;
    if (this.displayVariable.includes("-")) {
      this.displayVariable = this.displayVariable.substring(1);
    } else {
      this.displayVariable = `-${this.displayVariable}`;
    }
    display.textContent = this.displayVariable;
    this.displayLengthCorrect();
  }

  backspaceFunc() {
    if (this.displayVariable.length > 1) {
      this.displayVariable = this.displayVariable.substring(
        0,
        this.displayVariable.length - 1
      );
      display.textContent = this.displayVariable;
      this.displayLengthCorrect();
      return;
    } else if (this.previousVariable !== "") {
      this.displayVariable = "";
      display.textContent = "0";
      return;
    }
    this.displayVariable = "";
    display.textContent = "Start";
  }

  equalFunc() {
    if (!this.activeOperator) return;

    this.displayVariable = this.operate();
    display.textContent = this.displayVariable;
    this.activeOperator = "";
    this.pressedEqual = true;

    this.displayLengthCorrect();

    if (this.displayVariable == Infinity || this.displayVariable == -Infinity) {
      display.textContent = "You can't divide by 0";
    }
  }

  clearFunc() {
    this.previousVariable = "";
    this.displayVariable = "";
    this.activeOperator = "";
    this.pressedEqual = false;
    display.textContent = "Start";
  }
}

let calculator = new Calculator();

const display = document.querySelector(".calc__display");
const digits = document.querySelectorAll(".calc__digit");
const operators = document.querySelectorAll(".calc__operators");

const equal = document.querySelector(".calc__equal--btn");
const clear = document.querySelector(".calc__clear--btn");
const float = document.querySelector(".calc__float--btn");
const minus = document.querySelector(".calc__minus--btn");
const backspace = document.querySelector(".calc__backspace--btn");

//Event Listeners for screen

[...digits].forEach((digit) =>
  digit.addEventListener("click", (e) =>
    calculator.handleNumbers(e.target.textContent)
  )
);

[...operators].forEach((operator) =>
  operator.addEventListener("click", (e) =>
    calculator.handleOperators(e.target.textContent.trim())
  )
);

float.addEventListener("click", function () {
  calculator.floatFunc();
});
minus.addEventListener("click", function () {
  calculator.minusFunc();
});
backspace.addEventListener("click", function () {
  calculator.backspaceFunc();
});
equal.addEventListener("click", function () {
  calculator.equalFunc();
});
clear.addEventListener("click", function () {
  calculator.clearFunc();
});

//Keyboard support

document.addEventListener("keypress", ({ key }) => {
  if (!isNaN(+key)) {
    calculator.handleNumbers(key);
    return;
  }

  switch (key) {
    case "+":
    case "/":
    case "*":
      calculator.handleOperators(key);
      break;
    case ".":
      calculator.floatFunc();
      break;
    case "=":
    case "Enter":
      calculator.equalFunc();
      break;
    case "-":
      if (this.displayVariable === "") {
        calculator.minusFunc();
      } else {
        calculator.handleOperators(key);
      }
      break;
  }
});

document.addEventListener("keydown", ({ key }) => {
  if (key === "Backspace" || key === "Delete") {
    calculator.backspaceFunc();
  }
});
