const endPoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

fetch(endPoint).then(blob => {
  blob.json().then(data => {
    cities.push(...data);
  });
});
//console.log(cities)

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");
function findMatches(wordToMatch, cities) {
  const regex = new RegExp(wordToMatch, "gi");

  return cities.filter(place => {
    return place.city.match(regex) || place.state.match(regex);
  });
}

function displayMatches() {
  const matchesArray = findMatches(this.value, cities);
  console.log(matchesArray);

  let html = matchesArray
    .map(place => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(regex, `<mark>${this.value}</mark>`);
      const stateName = place.state.replace(
        regex,
        `<mark>${this.value}</mark>`
      );

      return `
    <li>
        <span class="name">
        ${cityName}, ${stateName}
        </span>
        <span class="population"> ${place.population}
        </span>
    </li>`;
    })
    .join("");
  if (this.value === "") {
    console.log("boş");
    html = ` <li>Filter For A City</li>
    <li>Or A State</li>`;
  }
  suggestions.innerHTML = html;
}

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
