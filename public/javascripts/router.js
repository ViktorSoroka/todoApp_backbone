define('router', ['backbone', 'collections/todo_items', 'views/todos_view'], function (Backbone, TodoItems, TodosView) {

    var requestConfig = {
            perPage: 5,
            offset: 1
        };

    return new (Backbone.Router.extend({
        routes: {
            "": "index",
            "todos/page/:offset": "page",
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
            new TodosView({collection: todoItems, nextPage: true});
            todoItems.fetch({
                reset: true,
                data: requestConfig
            });
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
                processData: true,
                data: requestConfig
            });
            new TodosView({collection: todoItems, nextPage: false});
        },

        page: function (page) {
            var todoItems = new TodoItems();
            todoItems.url += '/page/' + page;
            var todosView = new TodosView({collection: todoItems, nextPage: true});
            todoItems.fetch({
                reset: true,
                processData: true,
                data: {offset: +page, perPage: requestConfig.perPage},
                success: function (collection) {
                    if (collection.length < requestConfig.perPage) {
                        todosView.$("#next-page").detach().remove();
                    }
                }
            });
        }
    }));
});