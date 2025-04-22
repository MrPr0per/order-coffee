const addBeverageButton = document.getElementById('add-drink-button');
document.querySelector('.beverage').outerHTML;
addBeverageButton.addEventListener('click', () => addNewBeverage());

function addNewBeverage() {
    const beverages = document.querySelectorAll('.beverage');
    const newNumber = beverages.length + 1;

    const newBeverage = beverages[0].cloneNode(true);

    newBeverage.querySelector('.beverage-count').textContent = `Напиток №${newNumber}`;

    newBeverage.querySelectorAll('input[type="radio"]').forEach((radio) =>
        radio.name = `milk-${newNumber}`
    );

    newBeverage.querySelectorAll('input[type="checkbox"]').forEach((checkbox) =>
        checkbox.name = `options-${newNumber}`
    );

    const form = document.querySelector('form');
    form.insertBefore(newBeverage, addBeverageButton.parentElement);
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