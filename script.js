document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.gallery-track');
    const pager = document.querySelector('.pager');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    
    const images = document.querySelectorAll('.gallery img');
    const totalImages = images.length;
  
    let currentIndex = 0;
    let imagesToShow = window.innerWidth < 600 ? 1 : 3;  // Показываем 1 картинку на мобильных и 3 на компьютерах
    let totalSteps = totalImages - imagesToShow;  // Количество шагов, на которые можно сместить галерею
  
    // Функция для обновления отображения галереи
    function updateGallery() {
      const imageWidth = images[0].clientWidth; // Ширина одного изображения
      const translateXValue = currentIndex * -imageWidth; // Сдвиг на текущее изображение
      track.style.transform = `translateX(${translateXValue}px)`;
      updatePager();
      updateArrows();
    }
  
    // Обновление пейджера
    function updatePager() {
      pager.innerHTML = ''; // Очистка пейджера
  
      for (let i = 0; i <= totalSteps; i++) { // Делаем пейджер с шагами по одной картинке
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === currentIndex) {
          dot.classList.add('active');
        }
        dot.addEventListener('click', function () {
          currentIndex = i;  // Переключение на соответствующий шаг при нажатии на точку
          updateGallery();
        });
        pager.appendChild(dot);
      }
    }
  
    // Обновление состояния стрелок
    function updateArrows() {
      leftArrow.disabled = currentIndex === 0;
      rightArrow.disabled = currentIndex >= totalSteps;
    }
  
    // Прокрутка галереи вправо
    rightArrow.addEventListener('click', function () {
      if (currentIndex < totalSteps) {
        currentIndex++; // Увеличиваем индекс на 1 (сдвиг на одну картинку)
        updateGallery();
      }
    });
  
    // Прокрутка галереи влево
    leftArrow.addEventListener('click', function () {
      if (currentIndex > 0) {
        currentIndex--; // Уменьшаем индекс на 1 (сдвиг на одну картинку)
        updateGallery();
      }
    });
  
    // Изменение количества изображений при изменении размера окна
    window.addEventListener('resize', function () {
      imagesToShow = window.innerWidth < 600 ? 1 : 3;
      totalSteps = totalImages - imagesToShow; // Обновляем количество шагов при изменении размера экрана
      currentIndex = 0; // Возвращаемся на первый слайд при изменении размера экрана
      updateGallery();
    });
  
    updateGallery(); // Инициализация галереи при загрузке страницы
  });
  