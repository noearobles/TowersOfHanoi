"use strict";

const assert = require("assert");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});







// An object that represents the three stacks of Towers of Hanoi;
// * each key is an array of Numbers:
// * A is the far-left,
// * B is the middle,
// * C is the far-right stack
// * Each number represents the largest to smallest tokens:
// * 4 is the largest,
// * 1 is the smallest





let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: [],
};


let gathered = "";










// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
};






// Next, what do you think this function should do?
const movePiece = (firstStack, lastStack) => {
  gathered = stacks[firstStack].pop();
  stacks[lastStack].push(gathered);
};






// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (first, last) => {
  if (
    stacks[last].length === 0 ||
    stacks[first].slice(-1)[0] < stacks[last].slice(-1)[0]
  ) {
    return true;
  } else {
    return false;
  }
};





//valid input format and check
const validInput = (input1, input2) => {
  if (
    (input1 === "a" || input1 === "b" || input1 === "c") &&
    (input2 === "a" || input2 === "b" || input2 === "c")
  ) {
    return true;
  } else {
    return false;
  }
};






//logic to check current array vs win-state

function deepEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }
  if (isPrimitive(obj1) && isPrimitive(obj2)) {
    return obj1 === obj2;
  }
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }
  for (let key in obj1) {
    if (!(key in obj2)) return false;
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }
  return true;
}

function isPrimitive(obj) {
  return obj !== Object(obj);
}

function isPrimitive(obj) {
  return obj !== Object(obj);
}







// check for win
const checkForWin = () => {
  if (
    deepEqual(stacks, { a: [], b: [4, 3, 2, 1], c: [] }) ||
    deepEqual(stacks, { a: [], b: [], c: [4, 3, 2, 1] })
  ) {
    console.log("You win");
    stacks = {
      a: [4, 3, 2, 1],
      b: [],
      c: [],
    };
    return true;
  } else {
    return false;
  }
};








// When is this function called? What should it do with its argument?
const towersOfHanoi = (firstStack, lastStack) => {
  let input1 = firstStack.toLowerCase();
  let input2 = lastStack.toLowerCase();
  if (validInput(input1, input2) === true) {
    if (isLegal(input1, input2) === true) {
      movePiece(input1, input2);
      checkForWin();
    } else {
      console.error("invalid move");
    }
  } else {
    console.error("invalid input");
  }
};





const getPrompt = () => {
  printStacks();
  rl.question("first stack: ", (firstStack) => {
    rl.question("last stack: ", (lastStack) => {
      towersOfHanoi(firstStack, lastStack);
      getPrompt();
    });
  });
};








// Tests

if (typeof describe === "function") {
  describe("#towersOfHanoi()", () => {
    it("should be able to move a block", () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe("#isLegal()", () => {
    it("should not allow an illegal move", () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: [],
      };
      assert.equal(isLegal("a", "b"), false);
    });
    it("should allow a legal move", () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: [],
      };
      assert.equal(isLegal("a", "c"), true);
    });
  });
  describe("#checkForWin()", () => {
    it("should detect a win", () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });
  describe("#towersOfHanoi()", () => {
    it("should move several blocks", () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: [],
      };
      towersOfHanoi("a", "b");
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
      towersOfHanoi("a", "c");
      assert.deepEqual(stacks, { a: [4, 3], b: [1], c: [2] });
      towersOfHanoi("b", "c");
      assert.deepEqual(stacks, { a: [4, 3], b: [], c: [2, 1] });
      towersOfHanoi("a", "b");
      assert.deepEqual(stacks, { a: [4], b: [3], c: [2, 1] });
      towersOfHanoi("c", "a");
      assert.deepEqual(stacks, { a: [4, 1], b: [3], c: [2] });
      towersOfHanoi("c", "b");
      assert.deepEqual(stacks, { a: [4, 1], b: [3, 2], c: [] });
    });
  });
  describe("#validInput()", () => {
    it("should not allow an illegal input", () => {
      assert.equal(validInput("stack-a", "stack-b"), false);
      assert.equal(validInput("a", "4"), false);
      assert.equal(validInput("$", "b"), false);
    });
  });
  describe("#checkForWin()", () => {
    it("should restart on win", () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      assert.deepEqual(stacks, { a: [4, 3, 2, 1], b: [], c: [] });
    });
  });
} else {
  getPrompt();
}