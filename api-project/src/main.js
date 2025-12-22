async function getData(dog) {
  try {
    const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
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
