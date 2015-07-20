define('views/todo_view', ['backbone', 'views/todo-form', 'text!templates/todo.tpl'], function (Backbone, Todo_form, Todo) {

    return Backbone.View.extend({
        tagName: 'tr',
        template: _.template(Todo),

        events: {
            'change input[type="checkbox"]': 'toggleStatus',
            'click span[data-delete]': 'deleteTodo',
            'click span[data-update]': 'updateTodo'
        },

        initialize: function () {
            this.model.on('change', this.render, this);
            this.model.on('destroy hide', this.remove, this);
            this.listenTo(this.model, 'remove', this.remove);
        },

        updateTodo: function (e) {
            var todoForm = new Todo_form({model: this.model, el: $('#popup')});
            todoForm.showPopup($(e.target).data('update'));
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
        },

        toggleStatus: function () {
            this.model.toggleStatus();
            this.model.save();
        }
    });
});