define('views/todo_view', ['backbone', 'text!templates/todo.tpl'], function (Backbone, Todo) {
    return Backbone.View.extend({
        template: _.template(Todo),

        events: {
            'change input': 'toggleStatus',
            'click span': 'deleteTodo'
        },

        initialize: function () {
            this.model.on('change', this.render, this);
            this.model.on('destroy hide', this.remove, this);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        remove: function () {
            this.$el.remove();
        },

        deleteTodo: function () {
            this.model.destroy();
            this.remove();
        },

        toggleStatus: function () {
            this.model.toggleStatus();
        }
    });
});