import '../css/app.scss';
import { BudgetController } from './modules/BudgetController.js';
import { UIController } from './modules/UIController.js';


let appController = ((budgetCtrl, UICtrl) => {
    
    const DOMElements = UICtrl.getDOMElements();

    function setEventListeners() {
        DOMElements.addBtn.addEventListener(`click`, ctrlAddItem);
        document.addEventListener(`keypress`, function (e) {
            if (e.keyCode === 13 || e.which === 13) {   // 'which' is for older browsers
                ctrlAddItem();
            }
        });
        document.querySelector(`.container`).addEventListener(`click`, deleteItem);
    }

    function deleteItem(e) {
        if (e.target.parentNode.className === `item__delete--btn`) {
            UICtrl.delItem(e.target);
            let type = e.target.parentNode.parentNode.parentNode.parentNode.id.slice(0, 3)
            budgetCtrl.delItem(e.target.parentNode.parentNode.parentNode.parentNode.id.slice(4), type);
            budgetCtrl.showData();
        }
    }

    function updateBudget(type) {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget(type);

        // 2. return the output
        let output = budgetCtrl.getOutput();

        // 3. Display the budget on the UI
        UICtrl.displayOutput(output);
    }

    function ctrlAddItem() {

        // 1. Get the field input data
        let input = UICtrl.getInput();

        if (input.addDescription && !isNaN(input.addValue) && input.addValue > 0) {
            // 2. Add the item into the budget controller
            let newItem = budgetCtrl.addItem(input.addType, input.addDescription, input.addValue);
    
            // 3. Add the item into the UI
            UICtrl.addItem(input.addType, newItem);

            // let newUIItem = document.querySelector(`#${input.addType}-${newItem.id}`);
            // newUIItem.querySelector(`.ion-ios-close-outline`).addEventListener(`click`, function(e) {
            //     UICtrl.delItem(newUIItem);
            //     budgetCtrl.delItem(newItem.id, input.addType);
            //     budgetCtrl.showData();
            // });

            // 4. Clear fields
            UICtrl.clearFields();
    
            // 5. Update butget
            updateBudget(input.addType);
            
            budgetCtrl.showData();
        }

    }

    return {
        init: () => {
            UICtrl.displayOutput({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                totalPercentage: -1
            });
            setEventListeners();
        }
    };
})(BudgetController, UIController);

appController.init();