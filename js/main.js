// Инициализация Swiper
const swiper = new Swiper('.mySwiper', {
    direction: 'vertical', // вертикальный слайдер
    loop: false,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return `<button class="${className}"><span class="slide-number">${index + 1}</span></button>`;
        },
    },
});

// Получаем все кнопки пагинации
const paginationButtons = document.querySelectorAll('.swiper-pagination button');

// Функция для обновления активного состояния
function updateActiveDot() {
    paginationButtons.forEach(btn => btn.classList.remove('active'));
    if (paginationButtons[swiper.activeIndex]) {
        paginationButtons[swiper.activeIndex].classList.add('active');
    }
}

// Изначально
updateActiveDot();

// Обработчик смены слайда
swiper.on('slideChange', () => {
    updateActiveDot();
});

// Добавляем обработчики клика по кнопкам
paginationButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        swiper.slideTo(index);
    });
});

// Логика переключения табов
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Убираем активный класс у всех табов и контента
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));

        // Добавляем активный класс текущему табу
        tab.classList.add('active');

        // Показываем соответствующий контент
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(`content-${tabId}`).classList.add('active');
    });
});

// Логика ховера: картинка → текст, и текст → картинка (для training__grid)
document.addEventListener('DOMContentLoaded', () => {
    const imageItems = document.querySelectorAll('.image__item');
    const textItems = document.querySelectorAll('.text__item');

    // === Логика: картинка → текст ===
    imageItems.forEach(item => {
        const targetId = item.getAttribute('data-target');
        if (!targetId) return;

        const textItem = document.querySelector(`.text__item[data-id="${targetId}"]`);
        if (!textItem) return;

        // При наведении на картинку — активируем текст
        item.addEventListener('mouseenter', () => {
            textItem.classList.add('text__item--active');

            // Определяем направление заполнения
            const index = Array.from(imageItems).indexOf(item);
            if (index === 0 || index === 1) {
                item.style.setProperty('--fill-direction', 'left');
            } else {
                item.style.setProperty('--fill-direction', 'right');
            }

            // Запускаем анимацию заполнения
            item.style.setProperty('--fill-width', '100%');
        });

        item.addEventListener('mouseleave', () => {
            textItem.classList.remove('text__item--active');
            item.style.setProperty('--fill-width', '0');
        });
    });

    // === Логика: текст → картинка ===
    textItems.forEach(item => {
        const targetId = item.getAttribute('data-id');
        if (!targetId) return;

        const imageItem = document.querySelector(`.image__item[data-target="${targetId}"]`);
        if (!imageItem) return;

        // При наведении на текст — активируем картинку
        item.addEventListener('mouseenter', () => {
            item.classList.add('text__item--active');

            // Определяем направление заполнения
            const index = Array.from(imageItems).indexOf(imageItem);
            if (index === 0 || index === 1) {
                imageItem.style.setProperty('--fill-direction', 'left');
            } else {
                imageItem.style.setProperty('--fill-direction', 'right');
            }

            // Запускаем анимацию заполнения
            imageItem.style.setProperty('--fill-width', '100%');
        });

        item.addEventListener('mouseleave', () => {
            item.classList.remove('text__item--active');
            imageItem.style.setProperty('--fill-width', '0');
        });
    });
});

// Логика переключения табов расписания
document.querySelectorAll('.timetable__tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Убираем активный класс у всех табов и таблиц
        document.querySelectorAll('.timetable__tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.timetable__table').forEach(t => t.classList.remove('active'));

        // Добавляем активный класс текущему табу
        tab.classList.add('active');

        // Показываем соответствующую таблицу
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(`timetable__table--${tabId}`).classList.add('active');
    });
});


document.querySelectorAll('.tab__header').forEach(header => {
    header.addEventListener('click', () => {
        const tabItem = header.closest('.tab__item');
        const isActive = tabItem.classList.contains('active');

        // Закрываем все табы
        document.querySelectorAll('.tab__item').forEach(item => {
            item.classList.remove('active');
        });

        // Открываем текущий, если был закрыт
        if (!isActive) {
            tabItem.classList.add('active');
        }
    });
});

document.addEventListener('click', burgerInit);

function burgerInit(e) {
    const isBurger = e.target.closest('.burger-icon');
    const isNavLink = e.target.closest('.nav__link');
    const isOverlay = e.target.closest('.overlay');

    // Только мобильные
    if (window.innerWidth > 1440) return;

    // Закрытие: по оверлею ИЛИ по пункту меню
    if (isOverlay || isNavLink) {
        document.body.classList.remove('body--opened-menu');
        return;
    }

    // Открытие/закрытие: только по бургеру
    if (isBurger) {
        document.body.classList.toggle('body--opened-menu');
    }
}
// Закрытие по клавише Esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('body--opened-menu')) {
        document.body.classList.remove('body--opened-menu');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.querySelector('.press-video__play-btn');
    const modalOverlay = document.getElementById('videoModalOverlay');
    const closeModalBtn = document.getElementById('closeVideoModal');

    // Функция открытия
    function openModal() {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку
    }

    // Функция закрытия
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Возвращаем прокрутку
        // Сбрасываем воспроизведение видео
        const video = modalOverlay.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    }

    // Обработчики событий
    playButton.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', function(event) {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
});
