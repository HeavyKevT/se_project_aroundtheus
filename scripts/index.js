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
const editCloseButton = document.querySelector("#editCloseButton");
const profileForm = document.forms["profile-form"];
const addButton = document.querySelector(".profile__add-button");
const profileAddModal = document.querySelector("#profile-add-modal");
const addModalForm = profileAddModal.querySelector("#add-modal-form");
const addCloseButton = document.querySelector("#addCloseButton");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardList = document.querySelector(".cards__list");
const imageModal = document.querySelector(".modal-image");
const imageModalTitle = imageModal.querySelector(".modal-image__title");
const imageModalPicture = imageModal.querySelector(".modal-image__picture");
const closeButtons = document.querySelectorAll(".modal__close");

/**********
 Functions
 **********/
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function renderCard(cardEl, container) {
  container.prepend(cardEl);
}

/*****************
 Open Image Modal
 *****************/
function openImageModal(data) {
  imageModalPicture.src = data.link;
  imageModalPicture.alt = data.name;
  imageModalTitle.textContent = data.name;

  //Force reflow (for image transition)
  imageModal.offsetHeight;

  openModal(imageModal);
}

function getCardView(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__label-name");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button--active");
  });

  const cardDeleteButton = cardElement.querySelector(".card__trash-button");
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    openImageModal(data);
  });

  return cardElement;
}

/***************
 Event Handlers
 ***************/
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleProfileAddSubmit(e) {
  e.preventDefault();
  const name = e.target.modal_title.value;
  const link = e.target.link.value;
  const cardView = getCardView({ name, link });
  renderCard(cardView, cardList);
  closeModal(profileAddModal);
  e.target.reset();
}

//Close Button Universal Handler
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

/****************
 Event Listeners
 ****************/
editButton.addEventListener("click", () => {
  openModal(profileEditModal);
  //Set the Title and Description values to the current text contents
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});
addButton.addEventListener("click", () => {
  openModal(profileAddModal);
});
profileForm.addEventListener("submit", handleProfileEditSubmit);
addModalForm.addEventListener("submit", handleProfileAddSubmit);

initialCards.forEach((data) => {
  const cardView = getCardView(data);
  renderCard(cardView, cardList);
});
