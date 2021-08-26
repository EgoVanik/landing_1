const checkNumInputs = (selecor) => {
    const numInputs = document.querySelectorAll(selecor);

    // валидация inputs
    numInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });

};
export default checkNumInputs;