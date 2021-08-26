const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
    const header = document.querySelector(headerSelector),
          tab = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector);

    // скрываем таб и удаляем класс активности
    const hideTabContent = () => {
        content.forEach(item => {
            item.style.display = "none";
        });

        tab.forEach(item => {
            item.classList.remove(activeClass)
        });
    };

    // показываем таб и добавляем класс активности
    // добавляем параметр по умолчанию i=0, чтобы при загрузке страницы отображался 1й таб
    const showTabContent = (i = 0) => {
        content[i].style.display = display;
        tab[i].classList.add(activeClass);
    };

    // инициализируем ф-ции при загрузке страницы
    hideTabContent();
    showTabContent();

    // делегирование событий
    header.addEventListener('click', (e) => {
        const target = e.target;

        // убираем точку у tabSelector с помощью регулярки и проверяем родителя на клик
        // перебираем таб и определяем на какой кликнули
        if (target &&
            (target.classList.contains(tabSelector.replace(/\./, "" ))) || 
            target.parentNode.classList.contains(tabSelector.replace(/\./, "" ))){
            // item - элемент который перебираем
            // i - номер элемента который перебираем
            tab.forEach((item, i) => {
                // если элемент на который кликнул пользователь = элементу котоырй перебирается в цикле
                if (target == item || target.parentNode == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
    
};
export default tabs;