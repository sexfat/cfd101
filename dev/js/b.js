var b = 10;
let age = 26;

// condition ? expression if true : expression if false
let drink = (age >= 21) ? "Beer" : "Juice";

console.log(drink); // "Beer"

// Equivalent to:
let drink;
if ((age >= 21)) {
  drink = "Beer";
} else {
  drink = "Juice";
}

console.log(drink); // "Beer"