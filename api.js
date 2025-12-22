async function getData(poke) {
  try {
    //go get data
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`);
    //handle errors
    if (response.status != 200) {
      throw new Error(response);
    } else {
        //makes the response into json data we can use
        const data = await response.json();
        console.log(data);
        document.getElementById("api.response").textContent = data.name;
    }
  } catch (error) {
    console.log(error);
  }
}
getData("gengar");