// const display = require("./display");

// const RESET = "0";
// const FG_RED = "31";
// const FG_GREEN = "32";

// const FG_CYAN = "36";

// const VERTICAL_SEPERATOR = "|";

// exports.draw = function() {
//     console.clear();
//     display.write("\n");

//     for (let index = 1; index <= 9; index++) {
//         display.setColor(FG_GREEN);
//         display.write(` ${index} `);
        

//         if (index == 9)
//             break;

//         if (index % 3 == 0) {
//             display.write("\n");
//             display.setColor(FG_CYAN);
//             display.write("-----------");
//             display.write("\n");
//         } else {
//             display.setColor(FG_CYAN);
//             display.write(VERTICAL_SEPERATOR);
//         }
//     }

//     display.setColor(RESET);
// };

// exports.set = function(number, value, color) {
//     let column = 2 + (((number - 1)% 3) * 4);
//     let row = 2 + Math.floor((number - 1)/ 3) * 2;
    
//     display.goto(column, row);
//     display.setColor(color);
//     display.write(value);
//     display.setColor(RESET);
// }

// exports.board = class {
//     constructor(){
//         this.columns = new Array(3);
//         for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
//             columns[rowIndex] = new Array(3);
//         }
//     }
// }