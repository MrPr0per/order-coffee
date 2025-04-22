const addBeverageButton = document.getElementById('add-drink-button');
addBeverageButton.addEventListener('click', () => addNewBeverage());

updateForms();


function addNewBeverage() {
    const beverages = document.querySelectorAll('.beverage');
    const newNumber = beverages.length + 1;
    const newBeverage = beverages[0].cloneNode(true);

    newBeverage.querySelectorAll('input[type="radio"]').forEach((radio) =>
        radio.name = `milk-${newNumber}`
    );
    newBeverage.querySelectorAll('input[type="checkbox"]').forEach((checkbox) =>
        checkbox.name = `options-${newNumber}`
    );

    const form = document.querySelector('form');
    form.insertBefore(newBeverage, addBeverageButton.parentElement);

    updateForms();
}

const overlay = document.querySelector('.overlay');
const closeButton = document.getElementById('close');
closeButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});

const submitButton = document.querySelector('.submit-button');
submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    overlay.style.display = 'flex';
});

function updateForms() {
    updateNumbers();
    updateRemoveButtons();
}

function updateNumbers() {
    const beverages = document.querySelectorAll(".beverage");
    beverages.forEach((beverage, index) => {
        beverage.querySelector(".beverage-count").textContent = `Напиток №${index + 1}`;
    });
}

function updateRemoveButtons() {
    const removeButtons = document.querySelectorAll(".remove-button");
    const beverages = document.querySelectorAll(".beverage");

    const shouldHide = beverages.length === 1;

    removeButtons.forEach((btn) => {
        btn.style.display = shouldHide ? "none" : "block";

        btn.onclick = () => {
            btn.parentElement.remove();
            updateForms();
        };
    });
}