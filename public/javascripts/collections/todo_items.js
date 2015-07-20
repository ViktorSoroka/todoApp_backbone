define('collections/todo_items', ['backbone', 'models/todo_item'], function (Backbone, TodoItem) {
    //TodoItems
    return Backbone.Collection.extend({
        model: TodoItem,
        urlRoot: '/todos',
        url: '/todos',
        parse: function(response, options) {
            if (response.collection) {
                this.total = response.total;
                this.offset = response.offset;
                return response.collection;
            }
            return response;
        },
        initialize: function () {
        }
    });
});