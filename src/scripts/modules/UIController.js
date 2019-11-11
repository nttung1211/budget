export let UIController = (() => {

    const DOMElements = {
        addType: document.querySelector(`.add__type`),
        addDescription: document.querySelector(`.add__description`),
        addValue: document.querySelector(`.add__value`),
        addBtn: document.querySelector(`.add__btn`)
    }

    return {
        getInput() {
            return {
                addType: DOMElements.addType.value,
                addDescription: DOMElements.addDescription.value,
                addValue: DOMElements.addValue.value
            };
        },
        getDOMElements() {
            return DOMElements;
        }
    };
})();
