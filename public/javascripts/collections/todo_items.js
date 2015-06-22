define('collections/todo_items', ['backbone', 'models/todo_item'], function (Backbone, TodoItem) {
    //TodoItems
    return Backbone.Collection.extend({
        model: TodoItem,
        url: '/todos',

        initialize: function () {
            this.on('remove', this.hideModel, this);
        },

        hideModel: function (model) {
            model.trigger('hide');
            console.log(model);
            //model.destroy();
        },

        focusOnTodoItem: function (id) {
            var modelsToRemove = this.filter(function (todoItem) {
                return todoItem.id != id;
            });

            this.remove(modelsToRemove);
        }
    });
});