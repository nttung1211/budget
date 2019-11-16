export let UIController = (() => {

    const DOMElements = {
        addType: document.querySelector(`.add__type`),
        addDescription: document.querySelector(`.add__description`),
        addValue: document.querySelector(`.add__value`),
        addBtn: document.querySelector(`.add__btn`),
        incomeList: document.querySelector(`.income__list`),
        expensesList: document.querySelector(`.expenses__list`),
        budget: document.querySelector(`.budget__value`),
        totalInc: document.querySelector(`.budget__income--value`),
        totalExp: document.querySelector(`.budget__expenses--value`),
        totalPercentage: document.querySelector(`.budget__expenses--percentage`)
    }

    return {
        getInput() {
            return {
                addType: DOMElements.addType.value,
                addDescription: DOMElements.addDescription.value,
                addValue: +DOMElements.addValue.value
            };
        },

        addItem(type, item) {
            let html;
            if (type === `inc`) {
                html =
                    `<div class="item clearfix" id="inc-${item.id}">
                        <div class="item__description">${item.description}</div>
                        <div class="right clearfix">
                            <div class="item__value">+ ${item.value}</div>
                            <div class="item__delete">
                                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                            </div>
                        </div>
                    </div>`;
                DOMElements.incomeList.innerHTML += html;
            } else {
                html =
                    `<div class="item clearfix" id="exp-${item.id}">
                        <div class="item__description">${item.description}</div>
                        <div class="right clearfix">
                            <div class="item__value">- ${item.value}</div>
                            <div class="item__percentage">21%</div>
                            <div class="item__delete">
                                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                            </div>
                        </div>
                    </div>`;
                DOMElements.expensesList.innerHTML += html;
            }
        },

        delItem(eventTarget) {
            eventTarget.parentNode.parentNode.parentNode.parentNode.remove();
        },

        displayOutput(output) {
            DOMElements.budget.innerHTML = `${output.budget > 0 ? '+' : ''} ${output.budget}`;
            DOMElements.totalInc.innerHTML = `+${output.totalInc}`;
            DOMElements.totalExp.innerHTML = `-${output.totalExp}`;
            DOMElements.totalPercentage.innerHTML = output.totalPercentage !== -1 ? `${output.totalPercentage}%`: `- - -`;
        },

        clearFields() {
            [DOMElements.addDescription, DOMElements.addValue].forEach(field => field.value = '');
            DOMElements.addType.focus();
        },

        getDOMElements() {
            return DOMElements;
        }
    };
})();
