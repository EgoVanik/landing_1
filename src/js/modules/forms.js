import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');

    // валидация inputs
    checkNumInputs('input[name="user_phone"]');

    // сообщения  при отправке
    const message = {
        loading: "Загрузка...",
        success: "Спасибо, скоро с вами свяжемся",
        failure: "Что-то пошло не так '_'"
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        })

        return await res.text();
    };

    // очистка input
    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            // создаем div  с сообщением статуса, добавляем класс, встовляем в верстку
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);// собираем данные из формы
            if (item.getAttribute('data-calc') === "end"){
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('/assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => {
                    statusMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();// очистка inputs
                    setTimeout(() => {
                        statusMessage.remove();// удаляем сообщение
                    }, 3000);
                })
        });
    });

};
export default forms;