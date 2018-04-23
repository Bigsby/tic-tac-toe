const readline = require('readline');
const display = require("./display");

exports.listen = function(keyhandler) {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    process.stdin.on('keypress', (str, key) => {
        if (key.name == "q") {
            display.clearScreen();
            process.exit();
        } else {
            if ((key.name > "0" && key.name <= "9") || key.name == "r") {
                keyhandler(key.name)
            }
        }
    });
}