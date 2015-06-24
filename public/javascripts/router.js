define('router', ['backbone', 'collections/todo_items', 'views/todos_view'], function (Backbone, TodoItems, TodosView) {
    //TodoAp
    return new (Backbone.Router.extend({
        routes: {
            "": "index",
            "todos/:id": "show"
        },

        initialize: function () {
            var todoItems = new TodoItems();
            var todosView = new TodosView({collection: todoItems});
            todosView.render();
        },

        index: function () {
            var todoItems = new TodoItems();
            var todosView = new TodosView({collection: todoItems, el: $('#app')});
            todosView.render();
            todoItems.fetch();
        },

        start: function () {
            Backbone.history.start();
        },

        show: function (id) {
            $('#app').empty();
            var todoItems = new TodoItems();
            todoItems.add({id: id});
            todoItems.fetch();
            var todosView = new TodosView({collection: todoItems});
            //todosView.render();
            console.log(todoItems);
        }

    }));
});