const calcCase = document.querySelector('.display_buttons');
const clearButtons = document.querySelector(".calc_button__clear");
const numberButtons = document.getElementsByClassName("calc_button__number");
const operationButtons = document.getElementsByClassName("calc_button__operation");
const pointButton = document.querySelector(".calc_button__point");
const display = document.querySelector(".display_input");
/*создаем неизменные переменные, т.к они постоянны*/
let operatorPressed = false;
/*переменная для ввода новых чисел, в дефолте False, 
которая постоянно меняется после операций*/
let MemorycurrentNumber = 0;
/*значение дисплея по умолчанию (0)*/
let currentOperator = '';
/*сохранение в память операторов вычислений*/
let inMemory = '';
/*сохранение в память числа после вычислений*/

calcCase.onclick = function(event) {
    let button = event.target;
    if (button.dataset.number) {
        enterDataNumber(button.textContent);
    } else if (button.dataset.operation) {
        enterOperation(button.textContent);
    } else if (button.dataset.dot) {
        putDecimalPoint();
    } else if (button.dataset.clear) {
        clearDisplayAndMemory();
    } else return null;
}
/*объект события который вызывает срабатывание кнопок (number,operation,dot,CE and C*/
const enterDataNumber = (number) => {  
    if (operatorPressed) {
        if (number === '0') {
            number = '0';
            display.value = number;
            operatorPressed = false;
        } else {
        display.value = number;
        operatorPressed = false;
        };
    } else {     
        if (display.value === '0') {
            if (number === '0') {
                number = '0';
                display.value = number;
            } else {
            display.value = number;
            };
        } else {
            display.value += number;
        };
    };
};
/*ввод и вывод всех NumberButton, с возвращением булевого значения true после изменение в изначальное false*/
const enterOperation = (operation) => {   
    inMemory = display.value;  
    if(operatorPressed && currentOperator !== '=') {
        display.value = MemorycurrentNumber;
    } else {
        operatorPressed = true;
        if (currentOperator === '+') {
            MemorycurrentNumber += Number(inMemory);  
        } else if (currentOperator === '-') {
            MemorycurrentNumber -= Number(inMemory);  
        } else if (currentOperator === '*') {
            MemorycurrentNumber *= Number(inMemory);  
        } else if (currentOperator === '/') {
            MemorycurrentNumber /= Number(inMemory);  
        } else {
            MemorycurrentNumber = Number(inMemory);  
        }
            display.value = MemorycurrentNumber;
            currentOperator = operation;
    };        
};
/*выполнение всех мат.действий,а также =, с последующим запоминанием и выводом числа (решения) */
const clearDisplayAndMemory = (clearButtons) => {
        display.value = '0';
        MemorycurrentNumber= 0;
        operatorPressed = false;
        currentOperator = '';
        inMemory ='';
};
/*очиствка всех значенией, кнопки С и CE, */
const putDecimalPoint = () => {
    if (display.value === '0') {
        display.value = '0.';
    } else if (display.value.indexOf(".") === -1) { 
        display.value +=  '.';
    };
};
/*десятичные, по отношению к нулю, а также к остальным значениям 1-9 */
