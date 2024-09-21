const choices = ["papper", "rock", "shears", "well"];
let lastChoice = ""; // Переменная для хранения последнего выбора

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function() {
        const userChoice = this.id;  // Получаем выбор пользователя
        showText(userChoice); // Показываем выбор пользователя
        spinRoulette(userChoice); // Запускаем анимацию рулетки
    });
});

function showText(choice) {
    // Прячем все элементы внутри "choose-player"
    document.querySelectorAll('#choose-player div').forEach(div => {
        div.style.display = "none";
    });

    // Показываем только выбранный элемент
    document.getElementById(`${choice}-player`).style.display = "block";
}

function spinRoulette(userChoice) {
    const roulette = document.getElementById("items-container");

    // Случайный выбор компьютера
    let randomChoice = choices[Math.floor(Math.random() * choices.length)];

    // Если последний выбор совпадает, выбираем следующую копию
    if (randomChoice === lastChoice) {
        // Находим индекс текущего выбора
        randomChoice = choices[Math.floor(Math.random() * choices.length)];
        const currentIndex = choices.indexOf(randomChoice);
        // Увеличиваем индекс, чтобы выбрать следующую копию
        randomChoice = choices[(currentIndex + 1) % choices.length];
        
    }

    // Высота одного элемента
    const itemHeight = 100;

    // Индекс случайного выбора
    const randomIndex = choices.indexOf(randomChoice);

    // Рассчитываем позицию остановки (сдвигаем вниз на случайный элемент)
    const stopPosition = -itemHeight * (randomIndex + choices.length);

    // Запускаем анимацию
    roulette.style.transition = "top 2s ease-out";
    roulette.style.top = `${stopPosition}px`;

    // Обновляем последний выбор
    lastChoice = randomChoice;

    // Логируем случайный выбор для отладки
    console.log('Случайный выбор компьютера:', randomChoice);
    setTimeout(() => checkResult(userChoice, randomChoice), 2000);
}

function checkResult(userChoice, randomChoice) {
    
    const win = document.getElementById("win");
    const tie = document.getElementById("tie");
    const lose = document.getElementById("lose");
    win.classList.remove("show");
    tie.classList.remove("show");
    lose.classList.remove("show");

    if (userChoice === randomChoice) {
        console.log("Ничья!"); 
     
      tie.classList.add("show");
    } else if (
        (userChoice === "rock" && randomChoice === "shears") ||
        (userChoice === "shears" && randomChoice === "papper") ||
        (userChoice === "papper" && randomChoice === "rock") ||
        (userChoice === "papper" && randomChoice === "well") ||
        (userChoice === "well" && randomChoice === "rock") ||
        (userChoice === "well" && randomChoice === "shears")
    ) {
        console.log("Вы победили!");
        win.classList.add("show");
    } else {
        console.log("Вы проиграли!");
        lose.classList.add("show");
    }
}