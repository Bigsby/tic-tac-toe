const out = process.stdout;

const END_OF_BOARD = 7;

const ESCAPE = "\x1b[";
const RESET = "0";
const FG_RED = "31";
const FG_GREEN = "32";

const FG_CYAN = "36";

const VERTICAL_SEPERATOR = "|";

function clearLine() {
    write(`${ESCAPE}K`);
}

function hideCursor(){
    write(`${ESCAPE}?25l`);
}

function clearScreen(){
    write(`${ESCAPE}2J`);
}
exports.clearScreen = clearScreen;

function goto(row, column) {
    write(`${ESCAPE}${column};${row}H`);
}

exports.goto = goto;

function writeMessage(message) {
    goto(0, END_OF_BOARD);
    clearLine();
    goto(0, END_OF_BOARD + 1);
    clearLine();
    write(message);
    setColor(RESET);
}
exports.writeMessage = writeMessage;

function escapeColor(color){
    return `${ESCAPE}${color}m`;
}
exports.escapeColor = escapeColor;

function setColor(color, background) {
    var colorText = background ? `${color};${background}` : color;
    write(escapeColor(colorText));
}
exports.setColor = setColor;

function write(text) {
    out.write(text);
}
exports.write = write;

exports.writeInPosition = function(x, y, text, color, background) {
    goto(x, y);

    if (color) {
        setColor(color, background);
    }
        
    write(text);
    setColor(RESET);
}

exports.drawEmptyBoard = function() {
    clearScreen();
    hideCursor();
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

exports.RESET = RESET;