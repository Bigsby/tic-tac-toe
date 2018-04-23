const readline = require('readline');

exports.listen = function(keyhandler) {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdout.write("\x1b[?25l"); // hide cursor

    process.stdin.on('keypress', (str, key) => {
        if (key.name == "q") {
            console.clear();
            process.exit();
        } else {
            if ((key.name > "0" && key.name <= "9") || key.name == "r") {
                keyhandler(key.name)
            }
        }
    });
}