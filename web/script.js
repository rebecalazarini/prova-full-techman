const pinInput = document.getElementById('pin');
const keys = document.querySelectorAll('.key');
const clearButton = document.getElementById('clear');
const enterButton = document.getElementById('enter');

let pin = '';

// Handle key presses
keys.forEach(key => {
    key.addEventListener('click', () => {
        if (pin.length < 6) {
            pin += key.dataset.key;
            pinInput.value = pin.padStart(6, '*');
        }
    });
});

// Clear the pin input
clearButton.addEventListener('click', () => {
    pin = '';
    pinInput.value = '******';
});

// Enter button (you can implement your logic here)
enterButton.addEventListener('click', () => {
    alert(`Pin entered: ${pin}`);
    // Here you can validate the pin or perform further actions
});
