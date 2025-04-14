let travelData = null;

// Fetch data from JSON
fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => {
    travelData = data;
    console.log('Data loaded:', data);
  })
  .catch(error => console.error('Error:', error));

document.getElementById('search-btn').addEventListener('click', () =>filterSearchData());

//Filter search data
function filterSearchData(){
    const userInput = document.getElementById('search-input').value.trim().toLowerCase();
    if(!travelData){
        return alert('Data not loaded yet');
    }

    let results = [];

    if(userInput.match(/beach(es)?/)){
        results = travelData.beaches;
    } else if (userInput.match(/temple(s)?/)){
        results = travelData.temples;
    } else if (userInput.match(/countr(y|ies)/)){
        results = travelData.countries.flatMap(country => country.cities);
    } else {
        const countryMatch = travelData.countries.find(c => c.name.toLowerCase() === userInput);
        results = countryMatch ? countryMatch.cities : [];
    }

    if (results.length === 0) return alert('No results found');
    displayRecommendations(results);
}

// Display recommendations
function displayRecommendations(items) {
  const container = document.getElementById('recommendations-container');
  container.innerHTML = '';
  const hero = document.getElementsByClassName('hero')[0];
  if (hero) {
    hero.style.height = "auto";
  }
  
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'recommendation-card';
    card.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
    `;
    container.appendChild(card);
  });
}

// Clear functionality
document.getElementById('clear-btn').addEventListener('click', () => {
  document.getElementById('recommendations-container').innerHTML = '';
  document.getElementById('search-input').value = '';
  const hero = document.getElementsByClassName('hero')[0];
  if (hero) {
    hero.style.height = "100vh";
  }
});