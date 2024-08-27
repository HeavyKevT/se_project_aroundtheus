import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*********
 Elements
 *********/
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitleInput = document.querySelector("[name='modal_title']");
const profileDescriptionInput = document.querySelector(
  "[name='modal_description']"
);
const profileForm = document.forms["profile-form"];
const addButton = document.querySelector(".profile__add-button");
const profileAddModal = document.querySelector("#profile-add-modal");
const addModalForm = document.forms["add-modal-form"];
const cardList = document.querySelector(".cards__list");
const imageModal = document.querySelector(".modal-image");
const imageModalTitle = imageModal.querySelector(".modal-image__title");
const imageModalPicture = imageModal.querySelector(".modal-image__picture");
const closeButtons = document.querySelectorAll(".modal__close");
// Store references to the current handlers
let outsideClickHandler, escapePressHandler;

/**********
 Functions
 **********/

function renderCard(cardEl, container, method = "prepend") {
  container[method](cardEl);
}

function createCard({ name, link }) {
  const cardElement = new Card(
    { name, link },
    "#card-template",
    handleImageClick
  );
  return cardElement.getCardView();
}

// Define event handlers outside the modal functions
function handleOutsideClick(modal) {
  return function (event) {
    if (!event.target.closest(".modal-element")) {
      closeModal(modal);
    }
  };
}

function handleEscapePress(modal) {
  return function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
      closeModal(modal);
    }
  };
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  // Create handlers
  //outsideClickHandler gets handleOutsideClick(modal)'s return function
  outsideClickHandler = handleOutsideClick(modal);
  //escapePressHandler gets handleEscapePress(modal)'s return function
  escapePressHandler = handleEscapePress(modal);
  document.addEventListener("mousedown", outsideClickHandler);
  document.addEventListener("keydown", escapePressHandler);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  if (outsideClickHandler && escapePressHandler) {
    document.removeEventListener("mousedown", outsideClickHandler);
    document.removeEventListener("keydown", escapePressHandler);
  }

  // Clear handler references
  outsideClickHandler = null;
  escapePressHandler = null;
}

/***************
 Event Handlers
 ***************/
//Handle the Edit Modal Submit Button
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  profileTitleInput.value = "";
  profileDescriptionInput.value = "";
  editFormValidator.disableButton();
  closeModal(profileEditModal);
}

//Handle the Add Modal Submit Button
function handleProfileAddSubmit(e) {
  e.preventDefault();
  const name = e.target.modal_title.value;
  const link = e.target.link.value;
  const card = createCard({ name, link });
  addFormValidator.disableButton();
  renderCard(card, cardList);
  closeModal(profileAddModal);
  e.target.reset();
}

//Close Button Universal Handler
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("mousedown", () => closeModal(modal));
});

/****************
 Event Listeners
 ****************/
//Listen for Edit Button Press
editButton.addEventListener("click", () => {
  editFormValidator.resetValidation();
  openModal(profileEditModal);
  //Set the Title and Description values to the current text contents
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});
//Listen for Add Button Press
addButton.addEventListener("click", () => {
  openModal(profileAddModal);
});
//Listen for Profile form Submission
profileForm.addEventListener("submit", handleProfileEditSubmit);
//Listen for Add form Submission
addModalForm.addEventListener("submit", handleProfileAddSubmit);

//Opening the Image Modal
function handleImageClick(data) {
  imageModalPicture.src = data.link;
  imageModalPicture.alt = data.name;
  imageModalTitle.textContent = data.name;
  openModal(imageModal);
}

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error",
};

/*********************
 Class Instantiations
 *********************/
// Generate the default cards
initialCards.forEach((data) => {
  const card = createCard(data);
  renderCard(card, cardList);
});

const editFormValidator = new FormValidator(settings, profileEditModal);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, profileAddModal);
addFormValidator.enableValidation();
