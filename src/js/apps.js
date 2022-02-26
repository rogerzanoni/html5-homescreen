import { load as load_template } from './templates';
import Mustache from 'mustache';

var configjson = require('../config.json');
var template;
var root;
var page = {
    apps: []
};

function show() {
    root.innerHTML = Mustache.render(template, page);
}

function locateApp(appId, appList) {
    return appList.find(function(app){
        return app[0].split('@')[0] === appId
    });
}

function load_application_list() {
    navigator.appService.getApplications(true, result => {
        configjson.apps.forEach(function(app) {
            var internalApp = locateApp(app.id, result);

            if( internalApp ) {
                page.apps.push({
                    id: internalApp[0],
                    name: internalApp[1],
                    icon: app.icon
                });

                if( app.id === configjson.launch ) {
                    navigator.appService.start(internalApp[0]);
                }
            }

        });

        show();
    });
}

export function start(appId) {
    navigator.appService.start(appId.split('@')[0]);
}

export function init(node) {
    load_template('apps.template.html').then(function(result) {
        template = result;
        root = node;
        Mustache.parse(template);
        load_application_list();
    }, function(error) {
        console.error('ERRROR loading main template', error);
    });
}