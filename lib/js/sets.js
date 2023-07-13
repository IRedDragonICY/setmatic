function showPopup() {
  alert("SetMatic v1.0\nPembuat: Mohammad Farid Hendianto\n© 2023 Universitas Ahmad Dahlan. All rights reserved.");
}

$(document).ready(() => {
  $("#addSet").click(() => {
    const set = $(
      ` <div class="set"> <input type="text" placeholder="Char" class="char-input" maxlength="1" pattern="[a-zA-Z]"/> <span>{</span> <input type="text" placeholder="Elemen Himpunan" class="set-input" /> <span>}</span> <button class="removeSet"><i class="fa fa-trash" aria-hidden="true"></i></button> </div> `
    );
    $(".container").find("#addSet").before(set);
    set.hide().slideDown(200);
    toggleRemoveButtons($(".removeSet"));
  });

  function toggleRemoveButtons(removeButtons) {
    if (removeButtons.length > 2) {
      removeButtons.each((index, button) => {
        $(button).css("display", "block");
        $(button).click(() => {
          $(button)
            .parent()
            .fadeOut(200, function () {
              $(this).remove();
              toggleRemoveButtons($(".removeSet"));
            });
        });
      });
    } else {
      removeButtons.each((index, button) => {
        $(button).css("display", "none");
      });
    }
  }
  toggleRemoveButtons($(".removeSet"));

  $(document).on("keypress", ".char-input", (e) => {
    const char = String.fromCharCode(e.which);
    const regex = new RegExp("[a-zA-Z]");
    if (!regex.test(char)) {
      e.preventDefault();
      return false;
    }
  });

  $(document).on("change input", ".set-input", () => {
    const values = $(".set-input")
      .not($(".set-input").first())
      .map((index, input) => {
        const value = $(input).val().trim();
        if (!value) {
          return null;
        }
        const set = value
          .split(",")
          .map((value) => String(value.trim()))
          .filter((value) => value !== "")
          .sort((a, b) => parseInt(a) - parseInt(b));
        return set;
      })
      .get()
      .filter((value) => value !== null);
    let set = []
      .concat(...values)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .join(", ");
    $(".set-input").first().val(set);
  });
  $(document).on(
    "click",
    "#intersection, #union, #addition, #symmetricDifference, #subtraction, #cartesianProduct, #complement",
    function () {
      const operation = $(this).text();
      const input = $(".set-operation");
      input.val(input.val() + operation);
    }
  );

  $("#calculate").click(() => {
    const sets = {};
    $(".set").each((index, set) => {
      const char = $(set).find(".char-input").val();
      const values = $(set).find(".set-input").val().split(",");
      if (values.length === 1) {
        sets[char] = [String(values[0])];
      } else {
        const setValues = values.map((value) => {
          const trimmedValue = value.trim();
          if (
            trimmedValue.startsWith("(") &&
            trimmedValue.endsWith(")")
          ) {
            const pairValues = trimmedValue
              .substring(1, trimmedValue.length - 1)
              .split(",");
            return [String(pairValues[0]), String(pairValues[1])];
          } else {
            return String(trimmedValue);
          }
        });
        sets[char] = setValues;
      }
    });


    function intersection(a, b) {
      const multiSet = {};
      a.forEach((value) => {
        if (b.includes(value)) {
          multiSet[value] = Math.min(
            a.filter((x) => x === value).length,
            b.filter((x) => x === value).length
          );
        }
      });
      return Object.entries(multiSet).reduce((acc, [value, count]) => {
        for (let i = 0; i < count; i++) {
          acc.push(String(value));
        }
        return acc;
      }, []);
    }

    function union(a, b) {
      const multiSet = {};
      a.forEach((value) => {
        if (multiSet[value]) {
          multiSet[value]++;
        } else {
          multiSet[value] = 1;
        }
      });
      b.forEach((value) => {
        if (multiSet[value]) {
          multiSet[value] = Math.max(
            multiSet[value],
            b.filter((x) => x === value).length
          );
        } else {
          multiSet[value] = b.filter((x) => x === value).length;
        }
      });
      const multiSetResult = Object.entries(multiSet).reduce(
        (acc, [value, count]) => {
          for (let i = 0; i < count; i++) {
            acc.push(String(value));
          }
          return acc;
        },
        []
      );
      return multiSetResult;
    }

    function addition(a, b) {
      const multiSet = {};

      a.forEach((value) => {
        if (multiSet[value]) {
          multiSet[value]++;
        } else {
          multiSet[value] = 1;
        }
      });

      b.forEach((value) => {
        if (multiSet[value]) {
          multiSet[value]++;
        } else {
          multiSet[value] = 1;
        }
      });

      const multiSetResult = [];
      Object.entries(multiSet).forEach(([value, count]) => {
        for (let i = 0; i < count; i++) {
          multiSetResult.push(String(value));
        }
      });
      return multiSetResult;
    }

    function subtraction(a, b) {
      const multiSet = {};
      a.forEach((value) => {
        if (multiSet[value]) {
          multiSet[value]++;
        } else {
          multiSet[value] = 1;
        }
      });
      b.forEach((value) => {
        if (multiSet[value]) {
          multiSet[value] -= b.filter((x) => x === value).length;
        } else {
          multiSet[value] = -b.filter((x) => x === value).length;
        }
      });
      const multiSetResult = Object.entries(multiSet).reduce(
        (acc, [value, count]) => {
          for (let i = 0; i < count; i++) {
            acc.push(String(value));
          }
          return acc;
        },
        []
      );
      return multiSetResult;
    }

    function cartesianProduct(a, b) {
      const result = [];
      a.forEach((aValue) => {
        b.forEach((bValue) => {
          result.push(`(${aValue},${bValue})`);
        });
      });
      console.log(result);
      return result;
    }
    function complement(a) {
      let universal = document
        .querySelector(".set-input")
        .value.split(",")
        .map((x) => x.trim());
      return subtraction(universal, a);
    }

    function difference(a, b) {
      return a.filter((value) => !b.includes(value));
    }

    function shuntingYard(expression) {
      let outputQueue = [];
      let operatorStack = [];
      let operators = {
        "∩": { precedence: 2 },
        "∪": { precedence: 2 },
        "+": { precedence: 2 },
        "-": { precedence: 2 },
        "⊕": { precedence: 2 },
        n: { precedence: 2 },
        u: { precedence: 2 },
        "×": { precedence: 2 },
        "ꟲ": { precedence: 1 },
        "(": { precedence: 1 },
        ")": { precedence: 1 },
      };

      expression = expression.replace(/\s+/g, "");
      expression = expression
        .split(/([\+\-\∩\∪\⊕\×\ꟲ\(\)nu])/)
        .filter(Boolean);

      expression.forEach((token) => {
        if (token === "ꟲ") {
          operatorStack.push("ꟲ");
        } else
          if (token === "(") {
            operatorStack.push(token);
          } else if (token === ")") {
            while (operatorStack[operatorStack.length - 1] !== "(") {
              outputQueue.push(operatorStack.pop());
            }
            operatorStack.pop();
          } else if (token in operators) {
            while (
              operatorStack.length > 0 &&
              operators[token].precedence <=
              operators[operatorStack[operatorStack.length - 1]]
                .precedence
            ) {
              outputQueue.push(operatorStack.pop());
            }
            operatorStack.push(token);
          } else {
            outputQueue.push(token);
          }
      });
      while (operatorStack.length > 0) {
        outputQueue.push(operatorStack.pop());
      }
      return outputQueue;
    }





    function evaluateExpression(expression) {
      let stack = [];
      let operations = shuntingYard(expression);

      operations.forEach((token) => {
        if (token in sets) {
          stack.push(sets[token]);
        } else if (token === "ꟲ") {
          let [x] = [stack.pop()];
          x = complement(x);
          stack.push(x);
        } else {
          let [y, x] = [stack.pop(), stack.pop()];
          switch (token) {
            case "∩":
              stack.push(intersection(x, y));
              break;
            case "∪":
              stack.push(union(x, y));
              break;
            case "+":
              stack.push(addition(x, y));
              break;
            case "-":
              stack.push(subtraction(x, y));
              break;
            case "⊕":
              stack.push(difference(x, y).concat(difference(y, x)));
              break;
            case "×":
              x = x.map((value) => value.replace(/[\(\)]/g, ""));
              y = y.map((value) => value.replace(/[\(\)]/g, ""));
              if (x.length === 0 || y.length === 0) {
                stack.push([]);
                break;
              } else if (x.length === 1 && y.length === 1) {
                stack.push([`(${x},${y})`]);
                break;
              } else if (x.length === 1 && y.length > 1) {
                stack.push(y.map((value) => `(${x},${value})`));
                break;
              } else if (x.length > 1 && y.length === 1) {
                stack.push(x.map((value) => `(${value},${y})`));
                break;
              } else if (x.length > 1 && y.length > 1) {
                stack.push(
                  x.reduce((acc, xValue) => {
                    return [
                      ...acc,
                      ...y.map((yValue) => `(${xValue},${yValue})`),
                    ];
                  }, [])
                );
                break;
              }
              stack.push(cartesianProduct(x, y));
              break;

            case "n":
              stack.push(intersection(x, y));
              break;
            case "u":
              stack.push(union(x, y));
              break;
          }
        }
      });
      return stack.pop().join(",");
    }

    let operation = $(".set-operation").val();
    operation = operation.replace(/ꟲ/g, "(ꟲ)");



    const errorMessages = {
      emptyOperation: "Operasi tidak boleh kosong",
      doubleOperation: "Operasi tidak boleh double",
    };

    // fungsi untuk menampilkan pesan error
    function showError(message) {
      $(".error").text(message);
      $(".error").show();
    }

    // mengecek apakah operasi kosong
    if (operation === "") {
      showError(errorMessages.emptyOperation);
      return;
    }
    $(".result").val(`{${evaluateExpression(operation).split(",").sort((a, b) => a - b).join(",")}}`);
  });
});