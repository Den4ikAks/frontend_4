const galleryContainer = document.querySelector(".js-gallery");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox__image");
const closeButton = document.querySelector("[data-action='close-lightbox']");
const overlay = document.querySelector(".lightbox__overlay");

import { galleryItems } from "./galleryItems.js";

const createGalleryMarkup = (items) => {
    return items
        .map(({ preview, original, description }) => {
            return `
            <li class="gallery_item">
                <a class="gallery_link" href="${original}">
                    <img class="gallery_image" src="${preview}" data-source="${original}" alt="${description}">
                </a>
            </li>`;
        })
        .join("");
};

galleryContainer.innerHTML = createGalleryMarkup(galleryItems);

galleryContainer.addEventListener("click", (event) => {
    event.preventDefault();

    if (event.target.nodeName !== "IMG") return;

    const largeImageURL = event.target.dataset.source;
    openLightbox(largeImageURL);
});

const openLightbox = (url) => {
    lightbox.classList.add("is-active");
    lightboxImage.src = url;
};

const closeLightbox = () => {
    lightbox.classList.remove("is-active");
    lightboxImage.src = "";
};

closeButton.addEventListener("click", closeLightbox);

overlay.addEventListener("click", closeLightbox);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeLightbox();
    }
});
