import "./style.css";

//My api key is in a .env folder that I did .gitignore too
const apiKey = import.meta.env.VITE_POKEMON_API_KEY;
console.log("API key loaded:", apiKey ? "Yes" : "No");
console.log("API key value:", apiKey);

async function testAPI() {
  try {
    const response = await fetch("https://api.pokemontcg.io/v2/cards?pageSize=1", {
      headers: { "X-Api-Key": apiKey },
    });
    console.log("Test response status:", response.status);
    const data = await response.json();
    console.log("Test data:", data);
  } catch (error) {
    console.log("Test error:", error);
  }
}

testAPI();

function createCardHTML(card) {
  return `
    <div class="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-5 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-gray-200">
      <div class="mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-3">
        <img src="${card.images.small}" alt="${card.name}" loading="lazy" class="w-full rounded-md shadow-md"/>
      </div>
      <h3 class="font-bold text-xl mb-2 text-gray-900 font-['Poppins'] leading-tight">${card.name}</h3>
      <p class="text-sm text-gray-600 mb-1 font-['Poppins'] font-medium">${card.set.name}</p>
      <p class="text-sm font-bold text-blue-600 font-['Poppins'] bg-blue-50 inline-block px-3 py-1 rounded-full">${card.rarity || card.subtypes?.join(", ") || "N/A"}</p>
    </div>
  `;
}

//loading cards on page load, still takes a while, api is very slow
async function loadRandomCards() {
  try {
    const displayArea = document.getElementById("api-display");
    displayArea.textContent = "Loading cards...";

    const response = await fetch("https://api.pokemontcg.io/v2/cards?pageSize=12", {
      headers: { "X-Api-Key": apiKey },
    });

    if (!response.ok) throw new Error(`Error Status: ${response.status}`);

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      displayArea.textContent = "No cards found.";
      return;
    }

    displayArea.innerHTML = data.data.map(createCardHTML).join("");
  } catch (error) {
    console.log(error);
    displayArea.textContent = "Failed to load cards.";
  }
}

async function getPokemonCards() {
  try {
    //the idea if that it pulls pokemon cards pulled by using the set they are in and the rarity that they are. So all the ex's or gx's in paldean fates or smth.
    const setValue = document.getElementById("setInput").value.trim();
    const rarityValue = document.getElementById("rarityInput").value.trim();

    if (!setValue || !rarityValue) {
      document.getElementById("api-display").textContent = "Please enter both set and rarity/subtype.";
      return;
    }

    const displayArea = document.getElementById("api-display");
    displayArea.textContent = "Loading cards...";

    let query = "";
    const lowerRarity = rarityValue.toLowerCase();

    if (["ex", "gx", "v", "vmax", "vstar"].includes(lowerRarity)) {
      query = `set.name:"${setValue}" AND subtypes:${lowerRarity}`;
    } else {
      query = `set.name:"${setValue}" AND rarity:"${rarityValue}"`;
    }

    const url = `https://api.pokemontcg.io/v2/cards?q=${encodeURIComponent(query)}&pageSize=12`;

    //I could not figure this url out for a while. The website sucks at explaining it
    console.log("Query:", query);
    console.log("Full URL:", url);

    const response = await fetch(url, {
      headers: { "X-Api-Key": apiKey },
    });

    if (!response.ok) throw new Error(`Error Status: ${response.status}`);

    const data = await response.json();
    console.log("Response data:", data);
    console.log("Number of cards found:", data.data?.length || 0);

    if (!data.data || data.data.length === 0) {
      displayArea.textContent = "No cards found.";
      return;
    }

    displayArea.innerHTML = data.data.map(createCardHTML).join("");
  } catch (error) {
    console.log(error);
    document.getElementById("api-display").textContent = "Failed to load cards.";
  }
}

loadRandomCards();

document.getElementById("searchBtn")?.addEventListener("click", getPokemonCards);
document.getElementById("setInput")?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getPokemonCards();
});
document.getElementById("rarityInput")?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getPokemonCards();
});