define('collections/todo_items', ['backbone', 'models/todo_item'], function (Backbone, TodoItem) {
    //TodoItems
    return Backbone.Collection.extend({
        model: TodoItem,
        url: '/todos',
        //parse: function(response, options) {
        //    if (options.id) {
        //        return _.where(response, {id: options.id});
        //    }
        //    return response;
        //},
        initialize: function () {
        },

        focusOnTodoItem: function (id) {
            var modelsToRemove = this.filter(function (todoItem) {
                return todoItem.id != id;
            });

            this.remove(modelsToRemove);
        }
    });
});