const GREETING = require("../lang/en/en.js");

class Utils {
    getDate(name){
        const currentDate = new Date();

        return GREETING
            .replace("%1", name)
            .replace("%2", currentDate.toLocaleString());
    }
}

module.exports = Utils;