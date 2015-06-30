define('router', ['backbone', 'collections/todo_items', 'views/todos_view'], function (Backbone, TodoItems, TodosView) {
    //TodoAp
    return new (Backbone.Router.extend({
        routes: {
            "": "index",
            "todos/:id": "show"
        },

        initialize: function () {
            //this.todoItems = new TodoItems();
            //this.todoItems.fetch({reset: true});
            //var todosView = new TodosView({collection: todoItems});
            //todosView.render();
        },

        index: function () {
            var todoItems = new TodoItems();
            new TodosView({collection: todoItems, el: $('#app')});
            todoItems.fetch({reset: true});
        },

        start: function () {
            Backbone.history.start();
        },

        show: function (id) {
            $('#app').empty();
            var todoItems = new TodoItems();
            todoItems.url += '/' + id;
            todoItems.fetch({
                reset: true,
                processData: true
            });
            new TodosView({collection: todoItems, el: $('#app')});
        }

    }));
});