const out = process.stdout;

const END_OF_BOARD = 8;

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