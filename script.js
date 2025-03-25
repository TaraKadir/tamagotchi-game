class Pet {
  constructor(name, type) {
    this.name = name;
    this.animalType = type;
    this.energy = 50;
    this.fullness = 50;
    this.happiness = 50;

    // Startar en timer som körs var 10:e sekund
    this.intervalId = setInterval(() => {
      this.energy -= 15;
      this.fullness -= 15;
      this.happiness -= 15;

      this.energy = Math.max(this.energy, 0);
      this.fullness = Math.max(this.fullness, 0);
      this.happiness = Math.max(this.happiness, 0);

      // Hämtar kortet som tillhör husdjuret
      const petCards = document.querySelectorAll(".pet-card");
      petCards.forEach((card) => {
        if (card.querySelector("h3")?.textContent.includes(this.name)) {
          updatePetDisplay(card, this);
        }
      });

      if (this.energy === 0 || this.fullness === 0 || this.happiness === 0) {
        this.runAway();
      }
    }, 10000);
  }

  // Funktion för att ta bort husdjuret från DOM om den missköts
  runAway() {
    clearInterval(this.intervalId);

    const petCards = document.querySelectorAll(".pet-card");
    petCards.forEach((card) => {
      if (card.querySelector("h3")?.textContent.includes(this.name)) {
        card.remove();
      }
    });

    addToLog(`${this.name} ran away due to poor care...`);
  }
}

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

  // Eat knappen
  const eatBtn = document.createElement("button");
  eatBtn.textContent = "Eat";
  eatBtn.addEventListener("click", function () {
    pet.fullness += 30;
    pet.happiness += 5;
    pet.energy -= 15;

    pet.fullness = Math.min(pet.fullness, 100);
    pet.happiness = Math.min(pet.happiness, 100);
    pet.energy = Math.max(pet.energy, 0);

    updatePetDisplay(petDiv, pet);
    addToLog(`You fed ${pet.name}.`);
  });

  // Nap knappen
  const napBtn = document.createElement("button");
  napBtn.textContent = "Nap";
  napBtn.addEventListener("click", function () {
    pet.energy += 40;
    pet.happiness -= 10;
    pet.fullness -= 10;

    pet.energy = Math.min(pet.energy, 100);
    pet.happiness = Math.max(pet.happiness, 0);
    pet.fullness = Math.max(pet.fullness, 0);

    updatePetDisplay(petDiv, pet);
    addToLog(`${pet.name} took a nap.`);
  });

  petDiv.innerHTML = `
   <h3>${pet.name} (${pet.animalType})</h3>
   <p class="energy">Energy: ${pet.energy}</p>
   <p class="fullness">Fullness: ${pet.fullness}</p>
   <p class="happiness">Happiness: ${pet.happiness}</p>
 `;
  petDiv.appendChild(playBtn);
  petDiv.appendChild(eatBtn);
  petDiv.appendChild(napBtn);
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
