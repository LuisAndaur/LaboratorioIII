// function agregarImagenAsincronicoCallback(columna,agregarTexto, agregarImagen) {
//     agregarTexto(columna,"Buscando Imagen");
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//         console.log(this.responseText);
//         var blob = JSON.parse(this.responseText);
//         agregarImagen(columna, blob.sprites.other.dream_world.front_default);
//         apendizarTexto(columna,blob.forms.name);
//         }
//     };
//     xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/132", true);
//     xhttp.send();
// }

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  const paintCard = (pokemon) => {
    const flex = document.querySelector('.flex');
    const template = document.getElementById('card').content;
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();
  
    clone.querySelector('.card-body-img').setAttribute('src', pokemon.img);
    clone.querySelector(
      '.card-body-title'
    ).innerHTML = `${pokemon.name} <span>${pokemon.hp}hp</span>`;
    clone.querySelector('.card-body-text').textContent = `${pokemon.experience} exp`;
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = `${pokemon.attack}K`;
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = `${pokemon.special}K`;
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = `${pokemon.defense}K`;
  
    fragment.appendChild(clone);
    flex.appendChild(fragment);
  };
  
  const fetchData = async (id) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
  
    const pokemon = {
      img: data.sprites.other.dream_world.front_default,
      name: data.name,
      experience: data.base_experience,
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      special: data.stats[3].base_stat,
    };
  
    paintCard(pokemon);
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    const random = getRandomInt(1, 152);
    fetchData(random);
  });