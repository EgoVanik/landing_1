const forms = () => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          phoneInputs = document.querySelectorAll('input[name="user_phone"]');

    // валидация inputs
    phoneInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });

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

            const formData = new FormData(item);//собираем данные из формы

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