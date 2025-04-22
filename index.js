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