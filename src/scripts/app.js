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
    }

    function ctrlAddItem() {

        // 1. Get the field input data
        let input = UICtrl.getInput();
        // 2. Add the item into the budget controller
        let newItem = BudgetController.addItem(input.addType, input.addDescription, input.addValue);
        // 3. Add the item into the UI
        
        // 4. Calculate the budget
        
        // 5. Display the budget on the UI
        
        BudgetController.showData();
    }


    return {
        init: () => {
            setEventListeners();
        }
    };
})(BudgetController, UIController);

appController.init();