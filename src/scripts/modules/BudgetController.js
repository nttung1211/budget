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
        }
    };

    return {
        addItem: (type, des, val) => {
            // get id based on the last element id
            let ID = data.items[type].length ? data.items[type][data.items[type].length - 1].id + 1 : 0;

            // create new item
            let newItem = type === `inc` ? new Income(ID, des, val) : new Expense(ID, des, val);

            // push item into data
            data.items[type].push(newItem);

            // return new item
            return newItem;
        },

        showData() {
            console.log(data);
        }
    };
})();