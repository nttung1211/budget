export let BudgetController = (() => {

    class Expense {
        constructor(id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
        }
    }

    class Income {
        constructor(id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
        }
    }

    let data = {
        items: {
            exp: [],
            inc: []
        },
        total: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        totalPercentage: -1
    };

    return {
        addItem: (type, des, val) => {
            // get id based on the last element id
            let id = data.items[type].length ? data.items[type][data.items[type].length - 1].id + 1 : 0;

            // create new item
            let newItem = type === `inc` ? new Income(id, des, val) : new Expense(id, des, val);

            // push item into data
            data.items[type].push(newItem);

            // return new item
            return newItem;
        },

        delItem(id, type) {
            for (let i = 0; i < data.items[type].length; i++) {
                if (data.items[type][i].id == id) {
                    data.items[type].splice(i, 1);
                }
            }
        },

        calculateBudget(type) {
            // calculate total income and expenses
            data.total[type] = data.items[type].reduce((total, item) => total += item.value, 0);

            // calculate the budget
            data.budget = data.total.inc - data.total.exp;

            // calculate the percentage
            data.totalPercentage = data.total.inc ? +((data.total.exp / data.total.inc) * 100).toFixed(1) : -1;
        }, 

        getOutput() {
            return {
                budget: data.budget,
                totalInc: data.total.inc,
                totalExp: data.total.exp,
                totalPercentage: data.totalPercentage
            }
        },

        showData() {
            console.log(data);
        }
    };
})();