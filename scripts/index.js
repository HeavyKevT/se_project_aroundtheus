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

//open modal
let editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", openModal);
function openModal() {
  document.querySelector(".modal").classList.add("modal_opened");
}

//close modal
let closeButton = document.querySelector(".modal__close");
closeButton.addEventListener("click", closeModal);
function closeModal() {
  document.querySelector(".modal").classList.remove("modal_opened");
}
