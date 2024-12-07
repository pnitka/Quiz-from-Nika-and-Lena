const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'Какова была роль женщин в развитии компьютерной технологии в 1950-70 годах?',
        choice1: 'Заниматься хозяйством',
        choice2: 'Изобретать новое',
        choice3: 'Ничем не занимались',
        choice4: 'Работать на простых должностях',
        answer: 2
    },
    {
        question: 'Какие препятствия сталкивались женщины при попытке занять высокие должности в области программирования в те времена?',
        choice1: 'Занятость домом',
        choice2: 'Недостаточный опыт',
        choice3: 'Дискриминация',
        choice4: 'Столкнулись с профессионализацией',
        answer: 3
    },
    {
        question: 'Какое влияние оказали женщины-программисты на развитие компьютерных технологий в 1950-70 годах?',
        choice1: 'Никакого',
        choice2: 'Заложив основы для многих приёмов программирования',
        choice3: 'Женщины-программисты были исключительно ассистентками мужчин-программистов и не внесли никаких значимых вкладов ',
        choice4: 'Женщины-программисты были частными лицами, которые не имели доступа к ключевым технологиям и инновациям в области компьютеров',
        answer: 4
    },
    {
        question: 'Кто была первая женщина-программист коммерческих компьютеров? ',
        choice1: 'Мери Кубс',
        choice2: 'Грейс Хоппер',
        choice3: 'Екатерина Ющенко',
        choice4: 'Элси Шатт',
        answer: 2
    },
    {
        question: 'Кто из перечисленных женщин была первой женщиной-программистом, работавшей на коммерческих компьютерах?',
        choice1: 'Элси Шатт',
        choice2: 'Грейс Хоппер',        
        choice3: 'Мэри Кумбс',
        choice4: 'Екатерина Ющенко',
        answer: 3
    },
    {
        question: 'Какой статус закрепился за программированием в 1950-е годы?',        
        choice1: 'Мужская профессия',
        choice2: 'Женская профессия',        
        choice3: 'Нейтральная профессия',        
        choice4: 'Профессия для всех',
        answer: 2
    },
    {
        question: 'Какое занятие сравнивалось с программированием в контексте женской работы?',        
        choice1: 'Вязание',
        choice2: 'Шитье',        
        choice3: 'Кулинария',        
        choice4: 'Рисование',
        answer: 1
    },
    {
        question: 'Какую программу разработала Мэри Кумбс для компании Lyons?',        
        choice1: 'Программа для учета запасов',
        choice2: 'Программа для расчета заработной платы',        
        choice3: 'Программа для обработки данных',        
        choice4: 'Программа для управления проектами',
        answer: 2
    },
    {
        question: 'Какой язык программирования был разработан благодаря Грейс Хоппер?',        
        choice1: 'Python',
        choice2: 'Java',        
        choice3: 'COBOL',        
        choice4: 'C++',
        answer: 3
    },
    {
        question: 'Какой вклад внесла Грейс Хоппер в мир программирования?',        
        choice1: 'Разработала первый компьютер',
        choice2: 'Создала первый компилятор',        
        choice3: 'Написала первую программу для мобильного телефона',        
        choice4: 'Изобрела графический интерфейс',
        answer: 2
    }
];

//CONSTANTS 
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('end.html'); // Убедитесь, что путь правильный
    }
    questionCounter++;
    progressText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswer = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswer) return;

        acceptingAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = 
        selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        
        if(classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }
        
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();
