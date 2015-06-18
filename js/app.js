//= require jquery
//= require jquery_ujs
//= require backbone-rails
//= require_tree ./models
//= require_tree ./collections
//= require_tree ./views
//= require router

require.config({
    baseUrl: './js/',
    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min',
        backbone: '../bower_components/backbone/backbone-min',
        underscore: '../bower_components/underscore/underscore-min'
    },
    shim: {
        'jquery': {
            exports: '$'
        }
    }
});


define('app', ['router'], function (TodoApp) {
    console.log('aaaaaaa');
    $(function(){ TodoApp.start() });
});