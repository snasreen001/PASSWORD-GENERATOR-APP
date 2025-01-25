const inputSlider = document.querySelector("[data-lengthSlider]"); //fetching slider,,way to fetch custom attribute []
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]"); //holds all 4 checkboxes
const symbols = "~`!@#$%^&*()_-+={[}]|:;<,>.?/";

let password = ""; //initially password is empty
let passwordLength = 10; //intially length is 10.
let checkCount = 0; //to keep uppercase checkbox checked.
handleSlider();
setIndicator("#ccc");
//set strength of circle color to grey

//1. copyContent() -- to copy password when copy btn is clicked
//2. handleSlider() -- when slider handle changes, password length value also changes
//3. generatePassword()
//4. setIndicator()-- sets circle color and shadow
//5. getRandomInteger(min,max)
//6. getRandomUppercase()
//7. getRandomLowercase()
//8. getRandomNumber()
//9. getRandomSymbol()
//10.calculateStrength() -- on the strength basis, color of circle changes

//WORKING FLOW --> when slider handle changes, password length value changes.
// After including the desired checkboxes, upon clicking on the generate
// password button, a password is generated and displayed and color of the strengeth div also changes accordingly.

//1.sets passwordLength
function handleSlider() {
  //reflects password length on UI
  inputSlider.value = passwordLength; //sets the position of slider to 10.
  lengthDisplay.innerText = passwordLength; //sets passwordLength value to 10.
  const min = inputSlider.min;
  const max = inputSlider.max;
  inputSlider.style.backgroundSize =
    ((passwordLength - min) * 100) / (max - min) + "% 100%";
}

function setIndicator(color) {
  indicator.style.backgroundColor = color;
  indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
  //shadow
}

//Math.random() --> gives random value between 0 and 1. 0 inclusive, 1 exclusive
//Math.floor() --> gives round off value.
//0*(max-min)==0
//(max-min)+min==max
//Range -- min to max
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomNumber() {
  return getRandomInteger(0, 9);
}

function getRandomLowercase() {
  return String.fromCharCode(getRandomInteger(97, 122)); //a--97,z-123
}

function getRandomUppercase() {
  return String.fromCharCode(getRandomInteger(65, 91)); //a--97,z-123
}

function getRandomSymbol() {
  const randNum = getRandomInteger(0, symbols.length);
  return symbols.charAt(randNum);
}

function calculateStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if (uppercaseCheck.checked) hasUpper = true; //.checked --> it is a property to check whether input box is checked or not
  if (lowercaseCheck.checked) hasLower = true;
  if (numbersCheck.checked) hasNum = true;
  if (symbolsCheck.checked) hasSym = true;

  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

async function copyContent() {
  //await works only when we create async function
  //try-catch block is used for error handling
  try {
    await navigator.clipboard.writeText(passwordDisplay.value); //to copy the password value from the clipboard.'navigator.clipboard.writeText'method writes on the clipboard and returns a promise.
    //await makes sure that another line will get executed after the execution of line 102.
    //Promise will either resolve or reject. If it is resolved copyMsg="copied", if rejected copyMsg="failed".
    copyMsg.innerText = "copied"; //after getting copied, "copied" text is visible.
  } catch (e) {
    copyMsg.innerText = "failed";
  }
  copyMsg.classList.add("active"); //to make copy wala span visible,adds css properties of active class
  setTimeout(() => {
    copyMsg.classList.remove("active"); //to remove "copied" text after 2 sec
  }, 2000);
}

function shufflePassword(array) {
  //Fisher yates method -- find j randomly and then swap array[j] with array[i];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}

//eventListener will be applied on slider, generatePassword button, copyButton, checkBoxes

function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    //counts the no. of ticked checkboxes
    if (checkbox.checked) checkCount++;
  });
  //special condition
  //if slider value/password length is lesser than the no. of checkbox ticked, password length == no. of checkboxes ticked.
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
}

allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange); //change -- checkbox ticked/unticked, handleCheckBoxChange function is called when a checkbox is ticked/unticked.
});

inputSlider.addEventListener("input", (e) => {
  //'input' means when we change the position of slider
  passwordLength = e.target.value; //value of password variable will change to slider current value
  handleSlider(); //to reflect on UI
});

copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) copyContent(); //if password is non empty, then copy the password
});

generateBtn.addEventListener("click", () => {
  //none of checkbox selected
  if (checkCount == 0) return;
  //special condition
  //if slider value/password length is lesser than the no. of checkbox ticked, password length == no. of checkboxes ticked.
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
  //lets start the journey to find new password

  //remove old password
  password = "";

  //let's put the stuff mentioned by checkboxes.

  // if (uppercaseCheck.checked) {
  //   password += getRandomUppercase();
  // }
  // if (lowercaseCheck.checked) {
  //   password += getRandomLowercase();
  // }
  // if (numbersCheck.checked) {
  //   password += getRandomNumber();
  // }
  // if (symbolsCheck.checked) {
  //   password += getRandomSymbol();
  // }

  let funcArr = []; //whatever checkboxes are checked, we'll put the functions related to the checkboxes inside the funcArr array.

  if (uppercaseCheck.checked) funcArr.push(getRandomUppercase);
  if (lowercaseCheck.checked) funcArr.push(getRandomLowercase);
  if (numbersCheck.checked) funcArr.push(getRandomNumber);
  if (symbolsCheck.checked) funcArr.push(getRandomSymbol);

  //compulsory addition.
  //adding all the letters which are checked.
  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }
  //remaining addition.
  for (let i = 0; i < passwordLength - funcArr.length; i++) {
    let randIdx = getRandomInteger(0, funcArr.length);
    password += funcArr[randIdx]();
  }

  //shuffle the password -- if all the checkboxes are checked and we do not shuffle, first char will always be uppercase, second char will always be lowercase, third char will always be number, 4th char will always be a symbol ....

  password = shufflePassword(Array.from(password)); //sending password in the form of array as a parameter inside shufflePassword function

  //show in UI.
  passwordDisplay.value = password;

  //calculate strength
  calculateStrength();
});
