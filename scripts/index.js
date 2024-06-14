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
const addCloseButton = document.querySelector("#addCloseButton");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardList = document.querySelector(".cards__list");

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
  const imageModalTemplate = document.querySelector("#picture-modal-template")
    .content.firstElementChild;
  const imageModal = imageModalTemplate.cloneNode(true);

  const imageModalTitle = imageModal.querySelector(".modal-image__title");
  const imageModalPicture = imageModal.querySelector(".modal-image__picture");

  imageModalPicture.src = data.link;
  imageModalPicture.alt = data.name;
  imageModalTitle.textContent = data.name;

  function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  insertAfter(imageModal, profileAddModal);

  //Force reflow (for image transition)
  imageModal.offsetHeight;

  imageModal.classList.add("modal_opened");

  const imageCloseButton = imageModal.querySelector("#imageCloseButton");
  imageCloseButton.addEventListener("click", () =>
    imageModal.classList.remove("modal_opened")
  );
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

/****************
 Event Listeners
 ****************/
editButton.addEventListener("click", () => openModal(profileEditModal));
addButton.addEventListener("click", () => openModal(profileAddModal));
editCloseButton.addEventListener("click", () => closeModal(profileEditModal));
addCloseButton.addEventListener("click", () => closeModal(profileAddModal));
profileForm.addEventListener("submit", handleProfileEditSubmit);

profileAddModal.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.modal_title.value;
  const link = e.target.link.value;
  const cardView = getCardView({ name, link });
  renderCard(cardView, cardList);
  closeModal(profileAddModal);
});

initialCards.forEach((data) => {
  const cardView = getCardView(data);
  renderCard(cardView, cardList);
});
