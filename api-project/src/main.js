import './style.css'
async function getData(userinput) {
  try {
    const response = await fetch(`https://ghibliapi.vercel.app`);
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
//Idea: Pokemon cards pulled by using the set they are in and the rarity that they are. So ex. all the EX's or GX's in paldean fates or smth. 
