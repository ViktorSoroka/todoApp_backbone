require.config({
    baseUrl: '/javascripts',
    paths: {
        jquery: 'libs/jquery-min',
        backbone: 'libs/backbone-min',
        underscore: 'libs/underscore-min',
        text: 'libs/text',
        bootstrap: 'libs/bootstrap'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'backbone': {
            deps: ['underscore', 'jquery']
        }
    }
});


define('app', ['router', 'jquery'], function (TodoApp) {
    $(function(){ TodoApp.start() });
});