const out = process.stdout;

const END_OF_BOARD = 8;

const RESET = "0";
const FG_RED = "31";
const FG_GREEN = "32";

const FG_CYAN = "36";

const VERTICAL_SEPERATOR = "|";

function clearLine() {
    out.write("\x1b[K");
}

function goto(column, row) {
    out.write(`\x1b[${row};${column}H`);
}

exports.goto = goto;

exports.writeMessage = function(message) {
    goto(0, END_OF_BOARD);
    clearLine();
    goto(0, END_OF_BOARD + 1);
    clearLine();
    out.write(message);
}

exports.setColor = function(color) {
    out.write(`\x1b[${color}m`);
}

exports.write = function(text) {
    out.write(text);
}

exports.drawEmptyBoard = function() {
    console.clear();
    write("\n");

    for (let index = 1; index <= 9; index++) {
        setColor(FG_GREEN);
        write(` ${index} `);
        

        if (index == 9)
            break;

        if (index % 3 == 0) {
            write("\n");
            setColor(FG_CYAN);
            write("-----------");
            write("\n");
        } else {
            setColor(FG_CYAN);
            write(VERTICAL_SEPERATOR);
        }
    }

    setColor(RESET);
}