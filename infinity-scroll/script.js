// Unsplash API
const apiKey = "BlO-AmKswF1g8eaKcbXYeS2HJGgdlf18fYOjUl5-iSs";
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get Photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (error) {}
}

getPhotos();
