export let UIController = (() => {

    const DOMElements = {
        container: document.querySelector(`.container`),
        addType: document.querySelector(`.add__type`),
        addDescription: document.querySelector(`.add__description`),
        addValue: document.querySelector(`.add__value`),
        addBtn: document.querySelector(`.add__btn`),
        incomeList: document.querySelector(`.income__list`),
        expensesList: document.querySelector(`.expenses__list`),
        budget: document.querySelector(`.budget__value`),
        totalInc: document.querySelector(`.budget__income--value`),
        totalExp: document.querySelector(`.budget__expenses--value`),
        totalPercentage: document.querySelector(`.budget__expenses--percentage`),
        date: document.querySelector(`.budget__title--month`)
    };

    function formatNumber(num) {
        let parts = `${num}`.split(`.`);
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, `,`);
        return parts.join(`.`);
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
                            <div class="item__value">+ ${formatNumber(item.value)}</div>
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
                            <div class="item__value">- ${formatNumber(item.value)}</div>
                            <div class="item__percentage">- - -</div>
                            <div class="item__delete">
                                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                            </div>
                        </div>
                    </div>`;
                DOMElements.expensesList.innerHTML += html;
            }
        },

        delItem(item) {
            item.remove();
        },

        displayOutput(output) {
            DOMElements.budget.innerHTML = `${output.budget > 0 ? '+' : ''} ${formatNumber(output.budget)}`;
            DOMElements.totalInc.innerHTML = `+${formatNumber(output.totalInc)}`;
            DOMElements.totalExp.innerHTML = `-${formatNumber(output.totalExp)}`;
            DOMElements.totalPercentage.innerHTML = output.totalPercentage !== -1 ? `${output.totalPercentage}%`: `- - -`;
            let expPercentages = document.querySelectorAll(`.item__percentage`);
            for (let i = 0; i < expPercentages.length; i++) {
                if (output.expPercentages[i] !== -1) {
                    expPercentages[i].innerHTML = `${output.expPercentages[i]}%`;
                } else {
                    expPercentages[i].innerHTML = `- - -`;
                }
            }
        },

        displayDate() {
            let now = new Date(),
                year = now.getFullYear(),
                month = now.getMonth(),
                date = now.getDate(),
                day = now.getDay(),
                dayStrings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                monthStrings = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

            DOMElements.date.innerHTML = `${dayStrings[day]}, ${date}-${monthStrings[month]}-${year}`;
        },

        changeType() {
            [DOMElements.addType, DOMElements.addDescription, DOMElements.addValue].forEach(field => {
                field.classList.toggle(`red-focus`);
            })
            DOMElements.addBtn.classList.toggle(`red`);
        },

        clearFields() {
            [DOMElements.addDescription, DOMElements.addValue].forEach(field => {
                field.value = '';
            });
            DOMElements.addType.focus();
        },

        getDOMElements() {
            return DOMElements;
        }
    };
})();
