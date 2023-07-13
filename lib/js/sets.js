/*!
 * SetMatic v1.0
 * (c) 2023 Universitas Ahmad Dahlan. All rights reserved.
 * Pembuat: Mohammad Farid Hendianto
 * NIM: 220018401
 * Released under the GPL-3.0 License.
 */

function showPopup() {
  alert(
    "SetMatic v1.0\nPembuat: Mohammad Farid Hendianto\nNIM: 220018401\n© 2023 Universitas Ahmad Dahlan. All rights reserved."
  );
}

$(document).ready(() => {
  /**
   * Adds a new set to the container when the "Add Set" button is clicked.
   */
  $("#addSet").click(() => {
    const set = $(
      ` <div class="set"> <input type="text" placeholder="Char" class="char-input" maxlength="1" pattern="[a-zA-Z]"/> <span>{</span> <input type="text" placeholder="Elemen Himpunan" class="set-input" /> <span>}</span> <button class="removeSet"><i class="fa fa-trash" aria-hidden="true"></i></button> </div> `
    );
    $(".container").find("#addSet").before(set);
    set.hide().slideDown(200);
    toggleRemoveButtons($(".removeSet"));
  });

  /**
   * Toggles the display of remove buttons for sets based on the number of sets present.
   * If there are more than 2 sets, the remove buttons are displayed.
   * If there are 2 or fewer sets, the remove buttons are hidden.
   * @param {jQuery} removeButtons - The remove buttons to toggle.
   */
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

  /**
   * Adds an event listener to the document that listens for keypress events on elements with the class "char-input".
   * When a key is pressed, it gets the character code of the key pressed and converts it to a string.
   * It then creates a regular expression that matches any letter (a-z or A-Z).
   * If the character pressed is not a letter, it prevents the default action and returns false.
   * @param {Event} e - The keypress event.
   */
  $(document).on("keypress", ".char-input", (e) => {
    const char = String.fromCharCode(e.which);
    const regex = new RegExp("[a-zA-Z]");
    if (!regex.test(char)) {
      e.preventDefault();
      return false;
    }
  });

  /**
   * Adds an event listener to the document that listens for keypress events on elements with the class "char-input".
   * When a key is pressed, this function retrieves the character code of the pressed key and converts it to a string representation.
   * Afterwards, it creates a regular expression that matches any letter (a-z or A-Z).
   * If the pressed key is not a letter, the default action is prevented and the function returns false.
   *
   * @param {Event} e - The keypress event object.
   */
  $(document).on("change input", ".set-operation", () => {
    $(".error").hide();
    $(".result").val("");
  });

  /**
   * Adds an event listener to the document that listens for 'change' and 'input' events on elements with the class "set-input".
   * When either a 'change' or 'input' event is triggered, this function handles the logic for processing and manipulating sets.
   *
   * It retrieves the values from the input elements with the class "set-input" and performs the following operations:
   * 1. Trims each input value and filters out empty values.
   * 2. Converts each non-empty input value into an array, splitting values by comma (",").
   * 3. Trims and removes empty values within each array.
   * 4. Converts each value in the array to a string representation.
   * 5. Sorts the array in ascending order based on numerical value.
   * 6. Filters out arrays with null values.
   * 7. Concatenates all the valid arrays into a single array.
   * 8. Sorts the concatenated array in ascending order based on numerical value.
   * 9. Joins the elements of the sorted array by comma (", ") to form a string representation.
   * 10. Sets the resulting string as the value of the first input element with the class "set-input".
   *
   * Additionally, this code snippet adds a click event listener to specific elements with IDs corresponding to set operations.
   * When clicked, the text content of the clicked element is appended to the value of the input element with the class "set-operation".
   *
   * Note: Ensure that the necessary HTML elements with appropriate classes and IDs are present for the code to work correctly.
   */
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

  /**
   * Adds a click event listener to the element with the ID "calculate".
   * When clicked, this function handles the calculation of set operations based on the provided input.
   *
   * It retrieves the values from the input elements and performs the following operations:
   *
   * 1. Collects the values from the input elements with the class "set" and maps them to a sets object,
   *   where the character input and set input are stored as key-value pairs.
   *
   * 2. Defines helper functions for set operations:
   *   - `intersection(a, b)`: Calculates the intersection of two arrays.
   *   - `union(a, b)`: Calculates the union of two arrays.
   *   - `addition(a, b)`: Calculates the addition of two arrays.
   *   - `subtraction(a, b)`: Calculates the subtraction of two arrays.
   *   - `cartesianProduct(a, b)`: Calculates the cartesian product of two arrays.
   *   - `symmetricDifference(a, b)`: Calculates the symmetric difference of two arrays.
   *   - `complement(a)`: Calculates the complement of an array with respect to a universal set.
   *
   * 3. Implements the shunting yard algorithm to convert the input expression into Reverse Polish notation.
   *
   * 4. Evaluates the Reverse Polish notation to obtain the result of the set operations.
   *
   * 5. Handles error cases, such as empty operations or missing character sets.
   *
   * 6. Sets the result of the calculation in the input element with the class "result".
   *
   * Note: Ensure that the necessary HTML elements with appropriate classes and IDs are present for the code to work correctly.
   */

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
          if (trimmedValue.startsWith("(") && trimmedValue.endsWith(")")) {
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

    /**
     * Calculates the intersection of two arrays.
     *
     * @param {Array} a - The first input array.
     * @param {Array} b - The second input array.
     * @returns {Array} - An array containing the intersecting elements.
     */
    function intersection(a, b) {
      const multiSet = {};

      // Iterate over each value in array 'a'
      a.forEach((value) => {
        // Check if the value is included in array 'b'
        if (b.includes(value)) {
          // Calculate the minimum count of the value in both arrays
          multiSet[value] = Math.min(
            a.filter((x) => x === value).length,
            b.filter((x) => x === value).length
          );
        }
      });

      // Convert the multiSet object into an array with repeated values
      return Object.entries(multiSet).reduce((acc, [value, count]) => {
        // Push the value to the resulting array 'count' number of times
        for (let i = 0; i < count; i++) {
          acc.push(String(value));
        }
        return acc;
      }, []);
    }

    /**
     * Calculates the union of two arrays.
     *
     * @param {Array} a - The first input array.
     * @param {Array} b - The second input array.
     * @returns {Array} - An array containing the union of both input arrays.
     */
    function union(a, b) {
      const multiSet = {};

      // Iterate over each value in array 'a'
      a.forEach((value) => {
        if (multiSet[value]) {
          // Increment the count if the value already exists in the multiSet
          multiSet[value]++;
        } else {
          // Add the value to the multiSet with a count of 1
          multiSet[value] = 1;
        }
      });

      // Iterate over each value in array 'b'
      b.forEach((value) => {
        if (multiSet[value]) {
          // Update the count in the multiSet with the maximum count
          // between the existing count and the count in array 'b'
          multiSet[value] = Math.max(
            multiSet[value],
            b.filter((x) => x === value).length
          );
        } else {
          // Add the value to the multiSet with the count from array 'b'
          multiSet[value] = b.filter((x) => x === value).length;
        }
      });

      // Convert the multiSet object into an array with repeated values
      const multiSetResult = Object.entries(multiSet).reduce(
        (acc, [value, count]) => {
          // Push the value to the resulting array 'count' number of times
          for (let i = 0; i < count; i++) {
            acc.push(String(value));
          }
          return acc;
        },
        []
      );

      return multiSetResult;
    }

    /**
     * Performs the addition of two arrays.
     *
     * @param {Array} a - The first input array.
     * @param {Array} b - The second input array.
     * @returns {Array} - An array containing the addition of both input arrays.
     */
    function addition(a, b) {
      const multiSet = {};

      // Iterate over each value in array 'a'
      a.forEach((value) => {
        if (multiSet[value]) {
          // Increment the count if the value already exists in the multiSet
          multiSet[value]++;
        } else {
          // Add the value to the multiSet with a count of 1
          multiSet[value] = 1;
        }
      });

      // Iterate over each value in array 'b'
      b.forEach((value) => {
        if (multiSet[value]) {
          // Increment the count if the value already exists in the multiSet
          multiSet[value]++;
        } else {
          // Add the value to the multiSet with a count of 1
          multiSet[value] = 1;
        }
      });

      // Convert the multiSet object into an array with repeated values
      const multiSetResult = [];
      Object.entries(multiSet).forEach(([value, count]) => {
        // Push the value to the resulting array 'count' number of times
        for (let i = 0; i < count; i++) {
          multiSetResult.push(String(value));
        }
      });

      return multiSetResult;
    }

    /**
     * Performs the subtraction of two arrays.
     *
     * @param {Array} a - The first input array.
     * @param {Array} b - The second input array.
     * @returns {Array} - An array containing the subtraction of array 'b' from array 'a'.
     */
    function subtraction(a, b) {
      const multiSet = {};

      // Iterate over each value in array 'a'
      a.forEach((value) => {
        if (multiSet[value]) {
          // Increment the count if the value already exists in the multiSet
          multiSet[value]++;
        } else {
          // Add the value to the multiSet with a count of 1
          multiSet[value] = 1;
        }
      });

      // Iterate over each value in array 'b'
      b.forEach((value) => {
        if (multiSet[value]) {
          // Subtract the count of value in array 'b' from the multiSet
          multiSet[value] -= b.filter((x) => x === value).length;
        } else {
          // Add the value to the multiSet with a negative count
          multiSet[value] = -b.filter((x) => x === value).length;
        }
      });

      // Convert the multiSet object into an array with repeated values
      const multiSetResult = Object.entries(multiSet).reduce(
        (acc, [value, count]) => {
          // Push the value to the resulting array 'count' number of times
          for (let i = 0; i < count; i++) {
            acc.push(String(value));
          }
          return acc;
        },
        []
      );

      return multiSetResult;
    }

    /**
     * Calculates the Cartesian product of two arrays.
     *
     * @param {Array} a - The first input array.
     * @param {Array} b - The second input array.
     * @returns {Array} - An array containing the Cartesian product of both input arrays.
     */
    function cartesianProduct(a, b) {
      const result = [];

      // Iterate over each value in array 'a'
      a.forEach((aValue) => {
        // Iterate over each value in array 'b'
        b.forEach((bValue) => {
          // Push the pair (aValue, bValue) to the resulting array
          result.push(`(${aValue},${bValue})`);
        });
      });

      return result;
    }

    /**
     * Calculates the symmetric difference of two arrays.
     *
     * @param {Array} a - The first input array.
     * @param {Array} b - The second input array.
     * @returns {Array} - An array containing the symmetric difference of both input arrays.
     */
    function symmetricDifference(a, b) {
      return union(subtraction(a, b), subtraction(b, a));
    }

    /**
     * Calculates the complement of an array with respect to a universal set.
     *
     * @param {Array} a - The input array.
     * @returns {Array} - An array containing the complement of the input array.
     */
    function complement(a) {
      let universal = document
        .querySelector(".set-input")
        .value.split(",")
        .map((x) => x.trim());
      return subtraction(universal, a);
    }

    /**
     * Implements the Shunting Yard algorithm to convert the input expression into Reverse Polish notation.
     *
     * @param {String} expression - The input expression to be converted.
     * @returns {Array} - An array representing the expression in Reverse Polish notation.
     */
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
      expression = expression.split(/([\+\-\∩\∪\⊕\×\ꟲ\(\)nu])/).filter(Boolean);

      expression.forEach((token) => {
        if (token === "ꟲ") {
          operatorStack.push("ꟲ");
        } else if (token === "(") {
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
              operators[operatorStack[operatorStack.length - 1]].precedence
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

    /**
     * Evaluates the Reverse Polish notation to obtain the result of the set operations.
     *
     * @param {String} expression - The input expression in Reverse Polish notation.
     * @returns {String} - The result of the set operations as a string. The sets are formatted within curly braces.
     */
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
              stack.push(symmetricDifference(x, y));
              break;
            case "×":
              // Remove parentheses from elements in array 'x'
              x = x.map((value) => value.replace(/[\(\)]/g, ""));

              // Remove parentheses from elements in array 'y'
              y = y.map((value) => value.replace(/[\(\)]/g, ""));

              // Check conditions for Cartesian product calculation
              if (x.length === 0 || y.length === 0) {
                // If either 'x' or 'y' is empty, push an empty array to the 'stack'
                stack.push([]);
                break;
              } else if (x.length === 1 && y.length === 1) {
                // If both 'x' and 'y' have a length of 1, push the single pair to the 'stack'
                stack.push([`(${x},${y})`]);
                break;
              } else if (x.length === 1 && y.length > 1) {
                // If 'x' has a length of 1 and 'y' has a length greater than 1,
                // form the Cartesian product by combining the single element from 'x' with each element in 'y'
                stack.push(y.map((value) => `(${x},${value})`));
                break;
              } else if (x.length > 1 && y.length === 1) {
                // If 'x' has a length greater than 1 and 'y' has a length of 1,
                // form the Cartesian product by combining each element in 'x' with the single element from 'y'
                stack.push(x.map((value) => `(${value},${y})`));
                break;
              } else if (x.length > 1 && y.length > 1) {
                // If both 'x' and 'y' have lengths greater than 1,
                // form the Cartesian product by combining each element in 'x' with each element in 'y'
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

    // Retrieve the value of the input operation from the HTML element with the class "set-operation"
    let operation = $(".set-operation").val();

    // Replace any occurrence of the character "ꟲ" with "(ꟲ)" in the operation string
    operation = operation.replace(/ꟲ/g, "(ꟲ)");

    // Define error messages for different scenarios
    const errorMessages = {
      emptyOperation: "Operasi tidak boleh kosong",
      doubleOperation: "Operasi tidak boleh double",
      emptyCharSet: "Set yang dimasukkan tidak ada",
    };

    // Show an error message on the HTML elements with the class "error"
    function showError(message) {
      $(".error").text(message);
      $(".error").show();
    }

    // Check if the operation string is empty
    if (operation === "") {
      // Display an error message for empty operation
      showError(errorMessages.emptyOperation);
      return;
    }

    // Split the operation string into an array of characters, filter out only the uppercase letters,
    // and check if any of the characters do not exist as keys in the "sets" object
    if (
      operation
        .split("")
        .filter((x) => x.match(/[A-Z]/g))
        .some((x) => !sets[x])
    ) {
      // Display an error message for missing character sets
      showError(errorMessages.emptyCharSet);
      return;
    }

    // Calculate the result of the set operations using the "evaluateExpression" function,
    // split the result on commas, sort the resulting array, and join the elements with commas
    // Set the formatted result in the value of the HTML element(s) with the class "result"
    $(".result").val(
      `{${evaluateExpression(operation)
        .split(",")
        .sort((a, b) => a - b)
        .join(",")}}`
    );
  });
});
