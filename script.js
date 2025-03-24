class Pet {
  constructor(name, type) {
    this.name = name;
    this.animalType = type;
    this.energy = 50;
    this.fullness = 50;
    this.happiness = 50;
  }
}

console.log("Tamagotchi-spelet startar...");

const form = document.getElementById("pet-form");
const petNameInput = document.getElementById("pet-name");
const animalTypeSelect = document.getElementById("animal-type");
const petsList = document.getElementById("pets-list");

const pets = [];

// Skickar in formuläret
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = petNameInput.value;
  const type = animalTypeSelect.value;

  const newPet = new Pet(name, type);
  pets.push(newPet);

  displayPet(newPet);

  form.reset();
});

// Visa ett husdjur på sidan
function displayPet(pet) {
  const petDiv = document.createElement("div");
  petDiv.classList.add("pet-card");
  petDiv.innerHTML = `
      <h3>${pet.name} (${pet.animalType})</h3>
      <p>Energi: ${pet.energy}</p>
      <p>Mättnad: ${pet.fullness}</p>
      <p>Glädje: ${pet.happiness}</p>
    `;
  petsList.appendChild(petDiv);
}
