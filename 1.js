//  Пошук елементів 
const toggleButton = document.querySelector('#toggleButton');
const targetText = document.querySelector('#targetText');
const keyboardArea = document.querySelector('#keyboardArea');
const eventOutput = document.querySelector('#eventOutput');

//  1.1 Додавання слухача кліку 
const changeStyle = (event) => {
    const now = new Date().toLocaleTimeString();
    console.log(`Кнопку натиснуто: ${now}`);
    event.currentTarget.classList.toggle('highlight'); // 1.2
};
toggleButton.addEventListener('click', changeStyle);

//  1.3 Динамічний обробник наведення 
const handleMouseOver = () => {
    targetText.style.color = 'blue';
    console.log("Курсор наведено. Колір змінено на синій.");
    targetText.removeEventListener('mouseover', handleMouseOver); // 1.4
};
targetText.addEventListener('mouseover', handleMouseOver);

//  1.5 Відстеження координат кліку 
document.addEventListener('click', (event) => {
    console.log(`Клік у координатах: X=${event.clientX}, Y=${event.clientY}`);
});

//  1.6 Тимчасова зміна стилю після кліку 
const changeTempStyle = (event) => {
    event.currentTarget.style.backgroundColor = 'green';
    setTimeout(() => event.currentTarget.style.backgroundColor = '', 2000);
};
toggleButton.addEventListener('click', changeTempStyle);

//  1.7 Обробка клавіатури 
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') targetText.textContent = "Ви натиснули Enter!";
    if (event.key === 'Escape') targetText.textContent = "";
    eventOutput.textContent = `Ви натиснули клавішу: ${event.key}`;
});

//  1.8 Кнопка для активації наведення 
const activateHover = document.createElement('button');
activateHover.id = 'activateHover';
activateHover.textContent = 'Увімкнути / Вимкнути наведення';
document.body.appendChild(activateHover);

let hoverActive = false;
const hoverHandler = () => targetText.style.color = 'orange';

activateHover.addEventListener('click', () => {
    if (!hoverActive) {
        targetText.addEventListener('mouseover', hoverHandler);
        console.log("Реакція наведення УВІМКНЕНА");
    } else {
        targetText.removeEventListener('mouseover', hoverHandler);
        console.log("Реакція наведення ВИМКНЕНА");
    }
    hoverActive = !hoverActive;
});

//  Додаткове завдання (червоний текст) 
const toggleMouseListenerBtn = document.createElement('button');
toggleMouseListenerBtn.textContent = 'Увімкнути/Вимкнути червоний текст';
document.body.appendChild(toggleMouseListenerBtn);

const redColorHandler = () => targetText.style.color = 'red';
let redActive = false;

toggleMouseListenerBtn.addEventListener('click', () => {
    if (!redActive) {
        targetText.addEventListener('click', redColorHandler);
        console.log("Слухач червоного кольору додано");
    } else {
        targetText.removeEventListener('click', redColorHandler);
        console.log("Слухач червоного кольору знято");
    }
    redActive = !redActive;
});

//  Завдання 2: Глобальні події клавіатури 
let keyCount = 0;
let keyHistory = [];
let capsLockOn = false;
let secretKeys = ['a', 's', 'd', 'f'];
let currentIndex = 0;

document.addEventListener("keydown", event => {
    const key = event.key.toLowerCase();

    //  2.1–2.2 
    eventOutput.innerHTML = `
        Key: <strong>${event.key}</strong><br>
        Code: <strong>${event.code}</strong>
    `;

    //  2.3–2.4 Пробіл 
    if (event.code === 'Space') {
        keyboardArea.style.backgroundColor = '#ffebcd';
        event.preventDefault();
    }

    //  2.5 Лічильник 
    keyCount++;
    eventOutput.innerHTML += `<p>Кількість натискань: ${keyCount}</p>`;

    // 2.6 Історія 
    keyHistory.push(event.key);
    if (keyHistory.length > 10) keyHistory.shift();
    eventOutput.innerHTML += `<p>Історія: ${keyHistory.join(', ')}</p>`;

    //  2.7 Колір фону 
    if (key === 'r') keyboardArea.style.backgroundColor = 'red';
    if (key === 'g') keyboardArea.style.backgroundColor = 'green';
    if (key === 'b') keyboardArea.style.backgroundColor = 'blue';

    //  2.8 Зміна розміру тексту 
    const textElement = keyboardArea.querySelector('p');
    if (textElement) {
        let size = parseFloat(window.getComputedStyle(textElement).fontSize);
        if (key === '+') textElement.style.fontSize = `${size + 2}px`;
        if (key === '-') textElement.style.fontSize = `${Math.max(10, size - 2)}px`;
    }

    //  2.9 CapsLock 
    const capsState = event.getModifierState && event.getModifierState('CapsLock');
    if (capsState !== capsLockOn) {
        capsLockOn = capsState;
        keyboardArea.innerHTML = capsLockOn ? "<p>CapsLock увімкнено</p>" : "<p>CapsLock вимкнено</p>";
    }

    //  2.10 Міні-гра 
    if (key === secretKeys[currentIndex]) {
        currentIndex++;
        keyboardArea.innerHTML = `<p>Правильно! ${currentIndex}/${secretKeys.length}</p>`;
        if (currentIndex === secretKeys.length) {
            keyboardArea.innerHTML = "<p>🎉 Ви виграли міні-гру!</p>";
            currentIndex = 0;
        }
    } else if (secretKeys.includes(key)) {
        currentIndex = 0;
        keyboardArea.innerHTML = "<p>❌ Помилка! Почни спочатку.</p>";
    }
});

document.addEventListener("keyup", event => {
    if (event.code === 'Space') keyboardArea.style.backgroundColor = 'transparent';
});

//  Завдання 3: Події форм 
const loginForm = document.querySelector('#loginForm');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');

//  3.1 + 3.5 
loginForm.addEventListener("submit", event => {
    event.preventDefault();

    if (usernameInput.classList.contains('error')) {
        console.warn("❌ Форма не відправлена: Ім'я користувача не пройшло валідацію.");
        return;
    }

    const formData = {
        login: loginForm.elements.login.value,
        email: loginForm.elements.email.value
    };

    console.log("✅ Дані форми:", formData);
    loginForm.insertAdjacentHTML("afterend", `<p class="success">✅ Успішно! Дані форми виведено в консоль.</p>`);
});

//  3.2 Валідація live 
usernameInput.addEventListener('input', e => {
    const value = e.target.value;
    if (value.length < 4) {
        usernameInput.classList.add('error');
        usernameInput.style.border = '2px solid red';
    } else {
        usernameInput.classList.remove('error');
        usernameInput.style.border = '1px solid #007bff';
    }
});

//  3.3 Валідація blur 
usernameInput.addEventListener('blur', e => {
    if (e.target.value.trim() === '') {
        console.warn("⚠️ Поле 'Ім'я користувача' не може бути порожнім.");
        usernameInput.focus();
    }
});

//  3.4 Email 
emailInput.addEventListener('change', e => {
    console.log(`📧 Email змінено на: ${e.target.value}`);
});
