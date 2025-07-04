async function getRandomCatFact() {
  try {
    const res = await fetch('https://catfact.ninja/fact');
    const data = await res.json();
    document.getElementById('catFact').textContent = data.fact;
  } catch (error) {
    document.getElementById('catFact').textContent = "Error fetching fact.";
  }
}

async function loadBreeds() {
  try {
    const res = await fetch('https://api.thecatapi.com/v1/breeds');
    const breeds = await res.json();
    const select = document.getElementById('breedSelect');

    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      option.dataset.description = breed.description;
      option.dataset.origin = breed.origin;
      option.dataset.lifeSpan = breed.life_span;
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Error loading breeds:", error);
  }
}

function showBreedInfo() {
  const select = document.getElementById('breedSelect');
  const selected = select.options[select.selectedIndex];

  if (!selected.value) {
    document.getElementById('breedInfo').innerHTML = '';
    return;
  }

  const name = selected.textContent;
  const description = selected.dataset.description;
  const origin = selected.dataset.origin;
  const lifeSpan = selected.dataset.lifeSpan;

  document.getElementById('breedInfo').innerHTML = `
    <h3>${name}</h3>
    <p><strong>Origin:</strong> ${origin}</p>
    <p><strong>Lifespan:</strong> ${lifeSpan} years</p>
    <p>${description}</p>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  loadBreeds();
  document.getElementById('factBtn').addEventListener('click', getRandomCatFact);
  document.getElementById('breedSelect').addEventListener('change', showBreedInfo);
});