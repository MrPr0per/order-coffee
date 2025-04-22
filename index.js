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