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

function displayPet(pet) {
  const petDiv = document.createElement("div");
  petDiv.classList.add("pet-card");

  // Play knappen
  const playBtn = document.createElement("button");
  playBtn.textContent = "Play";

  // När man klickar på knappen ska husdjuret leka
  playBtn.addEventListener("click", function () {
    pet.happiness += 30;
    pet.energy -= 10;
    pet.fullness -= 10;

    pet.happiness = Math.min(pet.happiness, 100);
    pet.energy = Math.max(pet.energy, 0);
    pet.fullness = Math.max(pet.fullness, 0);

    updatePetDisplay(petDiv, pet);
    addToLog(`You played with ${pet.name}!`);
  });

  // Lägger till innehållet + knappen i kortet
  petDiv.innerHTML = `
   <h3>${pet.name} (${pet.animalType})</h3>
   <p class="energy">Energy: ${pet.energy}</p>
   <p class="fullness">Fullness: ${pet.fullness}</p>
   <p class="happiness">Happiness: ${pet.happiness}</p>
 `;
  petDiv.appendChild(playBtn);
  petsList.appendChild(petDiv);
}

function updatePetDisplay(petDiv, pet) {
  petDiv.querySelector(".energy").textContent = `Energy: ${pet.energy}`;
  petDiv.querySelector(".fullness").textContent = `Fullness: ${pet.fullness}`;
  petDiv.querySelector(
    ".happiness"
  ).textContent = `Happiness: ${pet.happiness}`;
}

function addToLog(message) {
  const logList = document.getElementById("log-list");
  const li = document.createElement("li");
  li.textContent = message;
  logList.prepend(li);
}
