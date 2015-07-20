define('views/todos_view', ['backbone', 'views/todo_view'], function (Backbone, TodoView) {

    return Backbone.View.extend({
        defaults: {
            nextPage: true
        },
        tagName: 'tbody',
        el: '#app',
        template: _.template('<div class="col-sm-12 next-page"><a id="next-page" href="#/todos/page/<%= page %>"><span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></a></div>'),
        initialize: function (options) {
            this.options = _.extend(this.defaults, options);
            this.collection.on('add', this.addOne, this);
            this.collection.on('reset', this.render, this);
        },

        render: function () {
            this.addAll();
            if (this.options.nextPage) {
                this.$el.append(this.template({page: this.collection.offset + 1}));
            }
            return this;
        },

        addAll: function () {
            this.$el.empty();
            this.collection.forEach(this.addOne, this);
        },

        addOne: function (todoItem) {
            var todoView = new TodoView({model: todoItem});
            this.$el.append(todoView.render().el);
        }
    });
});