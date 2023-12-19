const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const apiKey = "BlO-AmKswF1g8eaKcbXYeS2HJGgdlf18fYOjUl5-iSs";
const count = 30;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check to see the images loaded
function imageLoaded() {
  imagesLoaded++;
  console.log(imagesLoaded);
  if (totalImages === 30) {
    ready = true;
    loader.hidden = true;
    console.log("ready =", ready);
  }
}

// Helper function
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Adding the photos to the DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("total Images =", totalImages);
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Check when each is finished loading
    img.addEventListener("load", imageLoaded());

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get Photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

// Check to see if the user is scrolling to the bottom
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
    console.log("load moar");
  }
});

getPhotos();
