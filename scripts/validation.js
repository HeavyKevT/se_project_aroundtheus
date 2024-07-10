//Personal Work
// // First, select all the needed form elements, and assign them to variables
// const formElement = document.querySelector("form");
// const formInput = formElement.querySelector(".modal__input");
// const formError = formElement.querySelector(`.${formInput.id}-error`);

// const showInputError = (formElement, inputElement, errorMessage) => {
//   // Find the error message element inside the very function
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   // The rest remains unchanged
//   inputElement.classList.add("modal__input_type_error");
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add("modal__input-error_active");
// };

// const hideInputError = (formElement, inputElement) => {
//   // Find the error message element
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   // The rest remains unchanged
//   inputElement.classList.remove("modal__input_type_error");
//   errorElement.classList.remove("modal_input-error_active");
//   errorElement.textContent = "";
// };

// const checkInputValidity = (formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//     // The parameter of showInputError() is now a form,
//     // which contains a field to be checked
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     // The same for hideInputError(), Its parameter is now a form,
//     // which contains a field to be checked
//     hideInputError(formElement, inputElement);
//   }
// };

// const setEventListeners = (formElement) => {
//   // Find all fields inside the form, and
//   // make an array from them using the Array.from() method
//   const inputList = Array.from(formElement.querySelectorAll(".modal__input"));

//   // Iterate over the resulting array
//   inputList.forEach((inputElement) => {
//     // add the input event handler to each field
//     inputElement.addEventListener("input", () => {
//       // Call the checkInputValidity() function inside the callback,
//       // and pass the form and the element to be checked to it
//       checkInputValidity(formElement, inputElement);
//     });
//   });
// };

// const enableValidation = () => {
//   // It will find all forms with the specified class in DOM, and
//   // make an array from them using the Array.from() method
//   const formList = Array.from(document.querySelectorAll(".modal__form"));

//   // Iterate over the resulting array
//   formList.forEach((formElement) => {
//     formElement.addEventListener("submit", (evt) => {
//       // Cancel default behavior for each form
//       evt.preventDefault();
//     });

//     // Call the setEventListeners() function for each form,
//     // taking a form element as an argument
//     setEventListeners(formElement);
//   });
// };

// enableValidation({
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__button",
//   inactiveButtonClass: "popup__button_disabled",
//   inputErrorClass: "popup__input_type_error",
//   errorClass: "popup__error_visible",
// });

// // Call the function
// enableValidation();

// formElement.addEventListener("submit", function (evt) {
//   // Cancel the browser default action, so that clicking on the submit button won't refresh the page
//   evt.preventDefault();
// });

// // Call the checkInputValidity() function for each character input
// formInput.addEventListener("input", checkInputValidity);

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  console.log(errorMessageEl);
  errorMessageEl.classList.add(errorClass);
}

function hideInputError() {}

function checkInputValidity(formEl, options, inputEl) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, options, inputEl);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);
    //look for all inputs inside of form
    //loop through all the inputs to see if all are valid
    //if input is not valid
    //grab validation message,
    //add error class to input
    //display error message
    //disable button
    //if all inputs are valid
    //enable button
    //reset error message
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error",
};

enableValidation(config);
