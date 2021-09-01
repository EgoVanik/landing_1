const timer = (id, deadline) => {

    const addZero = (num) => {
        if (num <= 9){
            return '0' + num;
        } else {
            return num;
        }
    };

    const getTimeRemaining = (endtime) => {
        const t = Date.parse(endtime) - Date.parse(new Date()),//возвращаем кол-во мс (разницу между датами(от 1.1.1970))
              seconds = Math.floor((t/1000) % 60), //получаем кол-во сек. и округляем
              minutes = Math.floor((t/1000/60) % 60), // получаем минуты (деление с остатком)
              hours = Math.floor((t/(1000 * 60 * 60)) % 24), // получаем часы
              days = Math.floor((t/(1000 * 60 * 60 * 24))); // получаем дни

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    const setClock = (selector, endtime) => {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if(t.total <= 0) {
                days.textContent = "00";
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";

                clearInterval(timeInterval);
            }
        };
    };

    setClock(id, deadline);

};
export default timer;