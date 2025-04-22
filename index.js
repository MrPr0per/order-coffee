const addBeverageButton = document.getElementById('add-drink-button');
addBeverageButton.addEventListener('click', () => addNewBeverage());

updateForms();
addEventListeners()

function addEventListeners() {
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

    addEventListenerOnTextarea(document);

    const popupContent = document.querySelector('.popup__content');
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const drinks = [];
        const drinkFields = document.querySelectorAll('.beverage');

        drinkFields.forEach((drink, index) => {
            const drinkNumber = index + 1;
            const selectedDrink = drink.querySelector('select').value;

            const milkRadio = drink.querySelector('input[type="radio"]:checked');
            const milkType = milkRadio ? milkRadio.value : 'unknown';

            const options = [];
            drink.querySelectorAll('input[type="checkbox"]:checked').forEach(option => {
                options.push(option.value);
            });

            drinks.push({
                number: drinkNumber,
                drink: selectedDrink,
                milk: milkType,
                options: options
            });
        });

        popupContent.innerHTML = `<div class="popup__close" id="close"><div class="x">✕</div></div>`;
        const closeButton = document.getElementById('close');
        const overlay = document.querySelector('.overlay');
        closeButton.addEventListener('click', () => {
            overlay.style.display = 'none';
        });

        const count = document.createElement('h2');
        count.textContent = `Вы заказали ${drinks.length} ${getDrinkWord(drinks.length)}`;
        popupContent.appendChild(count);

        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.marginTop = '20px';
        table.style.borderCollapse = 'collapse';

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const headers = ['Напиток', 'Молоко', 'Дополнительно'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            th.style.padding = '10px';
            th.style.borderBottom = '1px solid #ddd';
            th.style.textAlign = 'left';
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');

        const getDisplayValue = (value) => {
            const displayValues = {
                'espresso': 'Эспрессо',
                'capuccino': 'Капучино',
                'cacao': 'Какао',
                'usual': 'обычное',
                'no-fat': 'обезжиренное',
                'soy': 'соевое',
                'coconut': 'кокосовое',
                'whipped cream': 'взбитые сливки',
                'marshmallow': 'зефирки',
                'chocolate': 'шоколад',
                'cinnamon': 'корица'
            };

            return displayValues[value] || value;
        };

        drinks.forEach(item => {
            const row = document.createElement('tr');

            const drinkCell = document.createElement('td');
            drinkCell.textContent = getDisplayValue(item.drink);
            drinkCell.style.padding = '10px';
            drinkCell.style.borderBottom = '1px solid #ddd';
            row.appendChild(drinkCell);

            const milkCell = document.createElement('td');
            milkCell.textContent = getDisplayValue(item.milk);
            milkCell.style.padding = '10px';
            milkCell.style.borderBottom = '1px solid #ddd';
            row.appendChild(milkCell);

            const optionsCell = document.createElement('td');
            optionsCell.textContent = item.options.map(opt => getDisplayValue(opt)).join(', ');
            optionsCell.style.padding = '10px';
            optionsCell.style.borderBottom = '1px solid #ddd';
            row.appendChild(optionsCell);

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        popupContent.appendChild(table);

        overlay.style.display = 'flex';
    });
}

function addEventListenerOnTextarea(node) {
    const newTextarea = node.querySelector('.comment-input');
    const newOutput = node.querySelector('.comment-output');
    newTextarea.addEventListener('input', () => {
        const parts = highlightUrgency(newTextarea.value);
        newOutput.replaceChildren(...parts.map(part => {
            const tag = part.bold ? document.createElement("b") : document.createElement("span");
            tag.innerText = part.text;
            return tag;
        }));
    });
}


function addNewBeverage() {
    const beverages = document.querySelectorAll('.beverage');
    const newNumber = beverages.length + 1;
    const newBeverage = beverages[0].cloneNode(true);

    // Сброс выбранных значений
    newBeverage.querySelector('select').selectedIndex = 1;
    newBeverage.querySelector('input[type="radio"][value="usual"]').checked = true;
    newBeverage.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    newBeverage.querySelector('.comment-input').value = '';
    newBeverage.querySelector('.comment-output').textContent = '';

    newBeverage.querySelectorAll('input[type="radio"]').forEach((radio) =>
        radio.name = `milk-${newNumber}`
    );
    newBeverage.querySelectorAll('input[type="checkbox"]').forEach((checkbox) =>
        checkbox.name = `options-${newNumber}`
    );

    addEventListenerOnTextarea(newBeverage);

    const form = document.querySelector('form');
    form.insertBefore(newBeverage, addBeverageButton.parentElement);

    updateForms();
}

function getDrinkWord(count) {
    const lastTwo = count % 100;
    const lastOne = count % 10;

    if (lastTwo >= 11 && lastTwo <= 19) {
        return 'напитков';
    }

    if (lastOne === 1) {
        return 'напиток';
    }

    if (lastOne >= 2 && lastOne <= 4) {
        return 'напитка';
    }

    return 'напитков';
}


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

function highlightUrgency(text) {
    const fragments = [];
    const regex = /(срочно|побыстрее|быстрее|поскорее|скорее|очень нужно)/gi;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            const before = text.slice(lastIndex, match.index);
            fragments.push({text: before, bold: false});
        }
        fragments.push({text: match[0], bold: true});
        lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
        fragments.push({text: text.slice(lastIndex), bold: false});
    }

    return fragments;
}