var configjson = require('../config.json');

export function load() {
    navigator.appService.start(configjson.background);
}


