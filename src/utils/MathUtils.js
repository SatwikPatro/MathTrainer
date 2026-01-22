// Generate a random number within a range
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Addition problem generator
function generateAddition(difficulty) {
  const ranges = {
    easy: { min: 1, max: 19 },
    medium: { min: 20, max: 99 },
    hard: { min: 100, max: 499 },
    "super hard": { min: 500, max: 5000 },
  };

  const { min, max } = ranges[difficulty];
  const num1 = getRandomNumber(min, max);
  const num2 = getRandomNumber(min, max);
  const correctAnswer = num1 + num2;

  return { num1, num2, operator: "+", correctAnswer };
}

// Subtraction problem generator
function generateSubtraction(difficulty) {
  const ranges = {
    easy: { min: 1, max: 19 },
    medium: { min: 20, max: 99 },
    hard: { min: 100, max: 499 },
    "super hard": { min: 500, max: 5000 },
  };

  const { min, max } = ranges[difficulty];
  let num1 = getRandomNumber(min, max);
  let num2 = getRandomNumber(min, max);

  // Ensure num1 >= num2 for positive result
  if (num1 < num2) {
    [num1, num2] = [num2, num1];
  }

  const correctAnswer = num1 - num2;

  return { num1, num2, operator: "-", correctAnswer };
}

// Multiplication problem generator
function generateMultiplication(difficulty) {
  const ranges = {
    easy: { min1: 1, max1: 10, min2: 1, max2: 10 },
    medium: { min1: 10, max1: 29, min2: 1, max2: 10 },
    hard: { min1: 11, max1: 29, min2: 11, max2: 29 },
    "super hard": { min1: 30, max1: 99, min2: 30, max2: 99 },
  };

  const { min1, max1, min2, max2 } = ranges[difficulty];
  const num1 = getRandomNumber(min1, max1);
  const num2 = getRandomNumber(min2, max2);
  const correctAnswer = num1 * num2;

  return { num1, num2, operator: "×", correctAnswer };
}

// Division problem generator
function generateDivision(difficulty) {
  const ranges = {
    easy: { min1: 1, max1: 10, min2: 1, max2: 10 },
    medium: { min1: 10, max1: 29, min2: 1, max2: 10 },
    hard: { min1: 11, max1: 29, min2: 11, max2: 29 },
    "super hard": { min1: 30, max1: 99, min2: 30, max2: 99 },
  };

  const { min1, max1, min2, max2 } = ranges[difficulty];
  const divisor = getRandomNumber(min2, max2);
  const quotient = getRandomNumber(min1, max1);
  const dividend = divisor * quotient;

  return {
    num1: dividend,
    num2: divisor,
    operator: "÷",
    correctAnswer: quotient,
  };
}

// Operator generator map
const OPERATOR_GENERATORS = {
  "+": generateAddition,
  "-": generateSubtraction,
  "×": generateMultiplication,
  "÷": generateDivision,
};

// Available operators for random selection
const OPERATORS = ["+", "-", "×", "÷"];

// Generate a math problem based on operator and difficulty
export function generateProblem(operator, difficulty) {
  // Handle random operator selection
  if (operator === "random") {
    const randomOperator =
      OPERATORS[Math.floor(Math.random() * OPERATORS.length)];
    return OPERATOR_GENERATORS[randomOperator](difficulty);
  }

  // Generate problem for specific operator
  const generator = OPERATOR_GENERATORS[operator];
  if (!generator) {
    throw new Error(`Unknown operator: ${operator}`);
  }

  return generator(difficulty);
}
