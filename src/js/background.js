var configjson = require('../config.json');

export function load() {
    setTimeout(function() {
        navigator.appService.start(configjson.background);
    }, 2000);
}


