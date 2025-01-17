const keys = document.querySelector(".calculator-buttons");
keys.addEventListener("click", (event) => {
  const { target } = event;
  const { value } = target;
  if (!target.matches("button")) {
    return;
  } else {
    calculator.parseInput(value);
    // console.log(event);
    // console.log(target);
  }
});

const calculator = {
  displayText: "0",
  prevTotal: null,

  parseInput(value) {
    switch (value) {
      case "ac":
        this.clearAll();
        break;
      case "=":
        this.calcAnswer(this.displayText);
        break;
      case "sqrt":
        if (isNaN(this.displayText)) {
          this.displayText = "Error";
        } else {
          this.calcAnswer(Math.pow(this.displayText, 2));
        }
        break;
      case "cube":
        if (isNaN(this.displayText)) {
          this.displayText = "Error";
        } else {
          this.calcAnswer(Math.pow(this.displayText, 3));
        }
        break;
      case ".":
        if (this.displayText == 0) {
          this.addText("0.");
        } else {
          this.addText(value);
        }
        break;
      default:
        this.addText(value);
        break;
    }
  },
  addText(value) {
    if (this.displayText === "0" && !isNaN(value)) {
      this.displayText = "";
      this.outputText("");
    } else if (this.prevTotal !== null) {
      this.displayText = this.prevTotal;
      this.prevTotal = null;
    }

    // check if the displayText is empty and the entered value is an arithmetic operator
    if (this.displayText === "" && isNaN(value)) {
      return;
    }

    // check whether the last char in display AND the entered value are not numbers
    if (isNaN(+value) && isNaN(+this.displayText)) {
      if (isNaN(this.displayText.slice(-1))) {
        return;
      }
    }

    // check if value is decimal point and if there is already one present in the display text
    if (value === "." && this.displayText.includes(".")) {
      return;
    }

    this.displayText += value;
    this.outputText(this.displayText);
  },

  outputText(text) {
    document.querySelector(".calculator-screen").value = text;
  },

  calcAnswer(equation) {
    let result;
    try {
      result = eval(equation);
    } catch (error) {
      result = "Error";
    }
    this.displayText = result.toString();
    this.outputText(this.displayText);
  },

  clearAll() {
    this.displayText = "0";
    this.prevTotal = null;
    this.outputText(this.displayText);
  },
};
