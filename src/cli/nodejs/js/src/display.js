const out = process.stdout;

const END_OF_BOARD = 7;

const ESCAPE = "\x1b[";
const RESET = "0";
const COLOR_GREEN = "2";
const COLOR_BLACK = "0";

const FG_CYAN = "6";

const VERTICAL_SEPERATOR = "│";

function clearLine() {
    write(`${ESCAPE}K`);
}

function hideCursor() {
    write(`${ESCAPE}?25l`);
}

function clearScreen() {
    write(`${ESCAPE}2J`);
    resetColor();
}
exports.clearScreen = clearScreen;

function goto(row, column) {
    write(`${ESCAPE}${column};${row}H`);
}

exports.goto = goto;

function writePlayerMessage(prefixText, player, color, sufixText) {
    goto(0, END_OF_BOARD + 1);
    clearLine();
    write(prefixText);

    if (player) {
        setColor(color);
        write(player);
        resetColor();

    }

    if (sufixText) {
        write(sufixText);
    }
}
exports.writePlayerMessage = writePlayerMessage;

function writeFooterMessage(message) {
    goto(0, END_OF_BOARD + 3);
    write(message);
}
exports.writeFooterMessage = writeFooterMessage;

function escapeColor(color) {
    return `${ESCAPE}${color}m`;
}
exports.escapeColor = escapeColor;

function resetColor() {
    write(escapeColor(RESET))
}

function setColor(color, inverted) {
    if (inverted) {
        write(escapeColor(`3${COLOR_BLACK};4${color}`));
    } else {
        write(escapeColor(`3${color}`));
    }
}
exports.setColor = setColor;

function write(text) {
    out.write(text);
}

function offsetColumn(column) {
    return 3 + (column * 4);

}

function offsetRow(row) {
    return 2 + (row * 2);
}

exports.writeInPosition = function (x, y, text, color, inverted) {
    goto(offsetColumn(x), offsetRow(y));
    setColor(color, inverted);
    write(text);
    resetColor();
}

exports.drawEmptyBoard = function () {
    clearScreen();
    hideCursor();
    write("\n ");

    for (let index = 1; index <= 9; index++) {
        setColor(COLOR_GREEN);
        write(` ${index} `);

        if (index == 9)
            break;

        if (index % 3 == 0) {
            write("\n");
            setColor(FG_CYAN);
            write(" ───┼───┼───");
            write("\n ");
        } else {
            setColor(FG_CYAN);
            write(VERTICAL_SEPERATOR);
        }
    }

    resetColor();
}

exports.RESET = RESET;