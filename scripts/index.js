const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
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

// Elements
//Page Displaying Title
const profileTitle = document.querySelector(".profile__title");
//Page Displaying Description
const profileDescription = document.querySelector(".profile__description");
//Profile Edit Button
const editButton = document.querySelector(".profile__edit-button");
//Edit Pop-up
const profileEditModal = document.querySelector("#profile-edit-modal");
//Page Displaying Title (input)
const profileTitleInput = document.querySelector("[name='modal_title']");
//Page Displaying Description (input)
const profileDescriptionInput = document.querySelector(
  "[name='modal_description']"
);
//Edit Close Button
const editCloseButton = document.querySelector("#editCloseButton");
//Edit Modal Form
const profileForm = document.forms["profile-form"];

//Profile Add Button
const addButton = document.querySelector(".profile__add-button");
//The + "Add Image" Modal/Pop-up
const profileAddModal = document.querySelector("#profile-add-modal");
//Add Close Button
const addCloseButton = document.querySelector("#addCloseButton");
//card template
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardList = document.querySelector(".cards__list");

// Functions
//Open the Edit Modal
function openEditModal() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
}
//Open the Add Modal
function openAddModal() {
  profileAddModal.classList.add("modal_opened");
}

//Close a Modal
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function renderCard(cardEl, container) {
  container.prepend(cardEl);
}

// modalCloseButtons.forEach((modalCloseButton) => {
//   modalCloseButton.addEventListener("click", (e) => {
//     const popup = modalCloseButton.closest(imageModal);
//     closeModal(popup);
//   });
// });

function getCardView(data) {
  // clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  // access the card title and image and store them in variables
  const cardTitle = cardElement.querySelector(".card__label-name");
  const cardImage = cardElement.querySelector(".card__image");
  // set the path to the image to the link field of the object
  cardImage.src = data.link;
  // set the image alt text to the name field of the object
  cardImage.alt = data.name;
  // set the card title to the name field of the object, too
  cardTitle.textContent = data.name;

  //Toggle card like button
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button--active");
  });
  //Delete card
  const cardDeleteButton = cardElement.querySelector(".card__trash-button");
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  //Image Modal Functionality
  //image modal template
  const imageModalTemplate = document.querySelector("#picture-modal-template")
    .content.firstElementChild;
  // clone the template element with all its content and store it in an imageModal variable
  const imageModal = imageModalTemplate.cloneNode(true);
  // access the card title and image and store them in variables
  const imageModalTitle = imageModal.querySelector(".modal-image__title");
  const imageModalPicture = imageModal.querySelector(".modal-image__picture");

  function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  //add event listener for image element (to open up large pop-up)
  //Get the image modal
  //Open the Image Modal
  cardImage.addEventListener("click", () => {
    console.log(imageModal);

    cardImage.addEventListener("click", () => {
      console.log(imageModal);

      imageModalPicture.src = data.link;

      imageModalPicture.alt = data.name;

      imageModalTitle.textContent = data.name;

      insertAfter(imageModal, profileAddModal);

      // Force reflow
      imageModal.offsetHeight; // this forces the reflow

      imageModal.classList.add("modal_opened");
    });
  });

  const imageCloseButton = imageModal.querySelector("#imageCloseButton");

  //if  imageCloseButton pressed, close the image modal
  imageCloseButton.addEventListener("click", () =>
    imageModal.classList.remove("modal_opened")
  );

  //add hover states to close buttons (X)

  return cardElement;
}

// Event Handlers
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal();
}

// Event Listeners
//if editButton pressed, open the modal
editButton.addEventListener("click", openEditModal);
//if closeButton pressed, close the edit modal
editCloseButton.addEventListener("click", () => closeModal(profileEditModal));
//if addButton pressed, open the add modal
addButton.addEventListener("click", openAddModal);
//if  addCloseButton pressed, close the add modal
addCloseButton.addEventListener("click", () => closeModal(profileAddModal));
//if edit modal "Submit" button pressed, handle submission
profileForm.addEventListener("submit", handleProfileEditSubmit);

// //cycle through initialCards, getCardElement, then prepend new card
// initialCards.forEach((data) => {
//   const cardElement = getCardElement(data);
//   // cardList.prepend(cardElement);
// });

//if addModal submit is pressed, render the new card
profileAddModal.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target);
  const name = e.target.modal_title.value;
  const link = e.target.link.value;
  const cardView = getCardView({
    name,
    link,
  });
  renderCard(cardView, cardList);
  closeModal(profileAddModal);
});

initialCards.forEach((data) => {
  const cardView = getCardView(data);
  renderCard(cardView, cardList);
  // const cardElement = getCardElement(data);
  // return the ready HTML element with the filled-in data
});

console.log(document.body);

//To-Do
//Re-use code (under initialCards.forEach) to grab addPopup values
//so that you can run code to create card.
//Using "const title = e.target.title.value" and "const link = e.target.link.value",
//go through code again to render card, but keep your code DRY and convert it
//into a function.
//Copy and paste code under initialCards.forEach() into renderCard().

/*
Yourself:
-Implement listener for like button
-When you click on image, open up a popup
-delete button (hint: use remove() on an HTML element)
*/

//After rendering cards
//Create an EventListener for each card?
//

//Separating Out Functions

// function getCardView(data) {
//   // clone the template element with all its content and store it in a cardElement variable
//   const cardElement = cardTemplate.cloneNode(true);
//   // access the card title and image and store them in variables
//   const cardTitle = cardElement.querySelector(".card__label-name");
//   const cardImage = cardElement.querySelector(".card__image");
//   // set the path to the image to the link field of the object
//   cardImage.src = data.link;
//   // set the image alt text to the name field of the object
//   cardImage.alt = data.name;
//   // set the card title to the name field of the object, too
//   cardTitle.textContent = data.name;

//   //Toggle card like button
//   const cardLikeButton = cardElement.querySelector(".card__like-button");
//   cardLikeButton.addEventListener("click", () => {
//     cardLikeButton.classList.toggle("card__like-button--active");
//   });
//   //Delete card
//   const cardDeleteButton = cardElement.querySelector(".card__trash-button");
//   cardDeleteButton.addEventListener("click", () => {
//     cardElement.remove();
//   });

//   //Image Modal Functionality
//   //image modal template
//   const imageModalTemplate = document.querySelector("#picture-modal-template")
//     .content.firstElementChild;
//   // clone the template element with all its content and store it in an imageModal variable
//   const imageModal = imageModalTemplate.cloneNode(true);
//   // access the card title and image and store them in variables
//   const imageModalTitle = imageModal.querySelector(".modal-image__title");
//   const imageModalPicture = imageModal.querySelector(".modal-image__picture");

//   function insertAfter(newNode, referenceNode) {
//     referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
//   }

//   // document.body.appendChild(imageModal);
//   // set the path to the image to the image's src
//   imageModalPicture.src = data.link;
//   // set the image alt text to the name field of the object
//   imageModalPicture.alt = data.name;
//   // set the card title to the name field of the object, too
//   imageModalTitle.textContent = data.name;

//   insertAfter(imageModal, profileAddModal);

//   //add event listener for image element (to open up large pop-up)
//   //Get the image modal
//   //Open the Image Modal

//   const imageCloseButton = imageModal.querySelector("#imageCloseButton");

//   //if  imageCloseButton pressed, close the image modal
//   imageCloseButton.addEventListener("click", () =>
//     imageModal.classList.remove("modal_opened")
//   );

//   //add hover states to close buttons (X)

//   return cardElement;
// }

// const cardListResult = document.querySelectorAll("#card");
// // console.log(cardListResult);

// // Select all <li> elements inside the <ul> with id 'myList'
// // const listItems = document.querySelectorAll("#card");

// // Convert NodeList to array using Array.from()
// const arrayFromList = Array.from(cardListResult);

// // const listOfCards = document.querySelectorAll(".card");
// arrayFromList.forEach((element) => {
//   console.log(element);
//   const imageModalTemplate1 = document.querySelector("#picture-modal-template")
//     .content.firstElementChild;
//   // console.log(`imageModalTemplate1:${imageModalTemplate1}`);
//   const imageModal1 = imageModalTemplate1.cloneNode(true);
//   // console.log(`imageModal1:${imageModal1.value}`);
//   const imageModalTitle1 = imageModal1.querySelector(".modal-image__title");
//   // console.log(`imageModalTitle1:${imageModalTitle1}`);
//   const imageModalPicture1 = imageModal1.querySelector(".modal-image__picture");
//   // console.log(`imageModalPicture1:${imageModalPicture1}`);

//   const cardImage = cardTemplate.querySelector(".card__image");

//   // imageModalPicture1.src = data.link;
//   // imageModalPicture1.alt = data.name;
//   // imageModalTitle1.textContent = data.name;

//   imageModalPicture1.src = element.img.src;
//   imageModalPicture1.alt = element.img.alt;
//   imageModalTitle1.textContent = element.img.alt;

//   // function insertAfter(newNode, referenceNode) {
//   //   referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
//   // }

//   document.body.appendChild(imageModal1);

//   cardImage.addEventListener("click", () => {
//     imageModal1.classList.add("modal_opened");
//   });

//   const imageCloseButton1 = imageModal1.querySelector("#imageCloseButton");

//   imageCloseButton1.addEventListener("click", () =>
//     imageModal1.classList.remove("modal_opened")
//   );
// });
