import "./style.css";
//My api key is in a .env folder that I did .gitignore too
const apiKey = import.meta.env.VITE_API_KEY;

async function getPokemonCards() {

  try {
    //the idea if that it pulls pokemon cards pulled by using the set they are in and the rarity that they are. So all the ex's or gx's in paldean fates or smth.
    const set = document.getElementById("set").value.trim(); // in case user types extra
    const name = document.getElementById("name").value.trim();
    const url = `https://api.pokemontcg.io/v2/cards`;
    const url2 = `https://api.pokemontcg.io/v2/rarities`;
    const response = await fetch(url, {
      headers: {
        "X-Api-Key": apiKey,
      },
    })
    
    if (!response.ok) {
      throw new Error(`Error Status: ${response.status}`);
    } else {
      const data = await response.json();
      console.log(data);
      const displayArea = document.getElementById("api-display");
      displayArea.innerHTML = data.data
        .map(
          (card) => `
        <div class="card-container">
          <h3>${card.name}</h3>
          <img src="${card.images.small}" alt="${card.name}" />
        </div>
      `
        )
    }
  } catch (error) {
    console.log(error);
    document.getElementById("api-display").textContent =
      "Failed to load cards.";
  }
}
