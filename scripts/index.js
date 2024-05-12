let initialCards = [
  {
    name: "Glencoe, Scotland",
    link: "https://unsplash.com/photos/green-and-brown-mountains-beside-river-under-blue-sky-and-white-clouds-during-daytime-mKjXta9DGc8",
  },

  {
    name: "Nāpali Coast, Hawaii",
    link: "https://unsplash.com/photos/brown-and-green-mountain-ridge-near-body-of-water-Jat5D3lH_FA",
  },

  {
    name: "Banff National Park, Canada",
    link: "https://unsplash.com/photos/lake-by-the-mountains-near-pine-trees-lWMMq8Hh6Dg",
  },

  {
    name: "Uyuni Salt Flat, Bolivia",
    link: "https://unsplash.com/photos/white-clouds-under-blue-sky-7BG3z3N6zAI",
  },

  {
    name: "Le Morne Brabant, Mauritius",
    link: "https://unsplash.com/photos/aerial-photography-of-sea-near-mountain-at-daytime-WV4B_aVj0aQ",
  },

  {
    name: "Torres Del Paine, Chile",
    link: "https://unsplash.com/photos/snow-covered-mountain-in-reflective-photography-vmra8DWORZc",
  },
];

// Elements
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const closeButton = document.querySelector(".modal__close");
const editButton = document.querySelector(".profile__edit-button");

// Functions
function closeModal() {
  document.querySelector(".modal").classList.remove("modal_opened");
}

function openModal() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  document.querySelector(".modal").classList.add("modal_opened");
}

// Event Handlers
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal();
}

// Event Listeners
closeButton.addEventListener("click", closeModal);

editButton.addEventListener("click", openModal);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
