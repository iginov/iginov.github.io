// Переключение тем

const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Проверяем, есть ли сохраненная тема в localStorage
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.textContent = '☀️';
} else {
    themeToggle.textContent = '🌙';
}

// Обработчик переключения темы
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
    }
});

// Бургер-меню для мобильных устройств
const burgerMenu = document.querySelector('.burger-menu');
const mainNav = document.querySelector('.main-nav');

burgerMenu.addEventListener('click', () => {
    mainNav.classList.toggle('active');
});

// Закрытие меню при клике на ссылку (для мобильных)
const navLinks = document.querySelectorAll('.main-nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('active');
    });
});

// Данные проектов для портфолио
const projects = [
    {
        title: "Git Guide",
        description: "Подробное руководство по Git для начинающих и опытных разработчиков с примерами и объяснениями.",
        technologies: ["Документация", "Git"],
        category: "git",
        github: "https://github.com/iginov/git-guide"
    },
    {
        title: "PHP Dev Portfolio",
        description: "Одностраничное веб-приложение для курса SkillFactory (задание 4.9), демонстрирует навыки верстки и JS.",
        technologies: ["HTML", "CSS", "JavaScript"],
        category: "html-css javascript",
        github: "https://github.com/iginov/php-dev-portfolio",
        web: "https://iginov.ru/portfolio/php-dev-portfolio/"
    },
    {
        title: "Fast News",
        description: "Новостной сайт с адаптивной версткой, создан для практики SkillFactory.",
        technologies: ["HTML", "CSS"],
        category: "html-css",
        github: "https://github.com/iginov/fast-news",
        web: "https://iginov.ru/portfolio/fast-news/"
    },
    {
        title: "iginov.github.io",
        description: "Персональная страница на GitHub Pages.",
        technologies: ["HTML", "CSS"],
        category: "html-css",
        github: "https://github.com/iginov/iginov.github.io"
    },
    {
        title: "JS Start",
        description: "Практическая работа по модулю «Старт в JavaScript»",
        technologies: ["JavaScript"],
        category: "javascript",
        github: "https://github.com/iginov/js-start",
        web: "https://iginov.ru/portfolio/js-start/"
    },
    {
        title: "iginov.ru",
        description: "Мой персональный сайт с резюме, портфолио и блогом.",
        technologies: ["HTML", "CSS", "JavaScript"],
        category: "html-css javascript",
        web: "https://iginov.ru"
    }
];

// Функция для отображения проектов
function renderProjects(filter = "all") {
    const portfolioGrid = document.getElementById("portfolio-grid");
    if (!portfolioGrid) return; // Проверяем, есть ли элемент на странице

    portfolioGrid.innerHTML = ""; // Очищаем текущие проекты

    // Фильтруем проекты по категории
    const filteredProjects = filter === "all" ? projects : projects.filter(project => project.category.includes(filter));

    // Создаем карточки для каждого проекта
    filteredProjects.forEach((project, index) => {
        const card = document.createElement("article");
        card.classList.add("portfolio-card");
        card.style.animationDelay = `${index * 0.2}s`; // Задержка анимации для каждой карточки

        let linksHTML = "";
        if (project.github) {
            linksHTML += `<a href="${project.github}" target="_blank">GitHub</a>`;
        }
        if (project.web) {
            linksHTML += `<a href="${project.web}" target="_blank">Веб</a>`;
        }

        card.innerHTML = `
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            <div class="tech">
                ${project.technologies.map(tech => `<span>${tech}</span>`).join("")}
            </div>
            <div class="links">
                ${linksHTML}
            </div>
        `;

        portfolioGrid.appendChild(card);
    });
}

// Инициализация фильтров для портфолио
function setupPortfolioFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                // Убираем активный класс со всех кнопок
                filterButtons.forEach(btn => btn.classList.remove("active"));
                // Добавляем активный класс к нажатой кнопке
                button.classList.add("active");
                // Фильтруем проекты по выбранной категории
                const filter = button.getAttribute("data-filter");
                renderProjects(filter);
            });
        });

        // Отображаем все проекты при загрузке страницы
        renderProjects();
    }
}

// Вызываем функции после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    setupPortfolioFilters();
});

// Объяснение работы кода для портфолио:
// 1. Данные проектов: Все проекты хранятся в массиве 'projects' как объекты с названием, описанием, технологиями и ссылками.
// 2. Функция renderProjects(filter): Эта функция очищает текущий список проектов и отображает только те, которые соответствуют выбранному фильтру.
//    Если фильтр 'all', показываются все проекты. Для каждой карточки создается HTML с названием, описанием, тегами технологий и ссылками.
// 3. Функция setupPortfolioFilters(): Добавляет обработчики событий на кнопки фильтров. При клике на кнопку меняется активный класс и вызывается renderProjects с нужным фильтром.
// 4. Анимация: Каждая карточка появляется с небольшой задержкой (animationDelay), чтобы создать эффект последовательного появления.
// 5. Инициализация: При загрузке страницы (DOMContentLoaded) вызывается функция настройки фильтров, чтобы убедиться, что все элементы DOM доступны.

// Объяснение работы кода:
// 1. Переключение тем: При клике на иконку темы (☀️/🌙) мы добавляем или убираем класс 'dark-theme' у элемента body.
//    Это меняет CSS переменные на темные или светлые цвета. Выбранная тема сохраняется в localStorage, чтобы не сбрасываться при перезагрузке.
// 2. Бургер-меню: На мобильных устройствах при клике на иконку бургера меню навигации становится видимым (добавляется класс 'active').
//    При клике на любую ссылку в меню, оно закрывается. 