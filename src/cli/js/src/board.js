const display = require("./display");

const RESET = "0";
const FG_RED = "31";
const FG_GREEN = "32";
const FG_YELLOW = "33";
const FG_CYAN = "36";

const VERTICAL_SEPERATOR = "|";

const out = process.stdout;

function setColor(color) {
    out.write(`\x1b[${color}m`);
}

exports.draw = function() {
    console.clear();
    out.write("\n");

    for (let index = 1; index <= 9; index++) {
        setColor(FG_GREEN);
        out.write(` ${index} `);
        

        if (index == 9)
            break;

        if (index % 3 == 0) {
            out.write("\n");
            setColor(FG_CYAN);
            out.write("-----------");
            out.write("\n");
        } else {
            setColor(FG_CYAN);
            out.write(VERTICAL_SEPERATOR);
        }
    }

    setColor(RESET);
};

exports.set = function(number, value) {
    let column = 2 + ((number % 3) * 4);
    let row = 3 + Math.floor(number / 3) * 4;
    
    display.goto(column, row);
    setColor(FG_GREEN);
    out.write(value);
    setColor(RESET);
}