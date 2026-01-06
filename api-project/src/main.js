import './style.css'

let userinput = myElement.addEventListener("click", (e) => {});
async function getData(userinput) {
  try {
    const response = await fetch(`https://api.artic.edu/api/v1/artworks`);
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      console.log(data);
      document.getElementById("api.response").textContent = data.image;
    }
  } catch (error) {
    console.log(error);
  }
}
getData();
