define([
    'backbone'
    , 'bootstrap'
    , 'text!templates/todo-form.tpl'
    , 'models/todo_item'
], function (Backbone, bootstrap, tpl, Model) {
    return Backbone.View.extend({
        className: 'users-form',

        template: _.template(tpl),

        events: {
            'submit form': '_saveUser'
        },

        _saveUser: function (e) {
            e.preventDefault();

            var data = {};
            _.each(this.$('input'), function (input) {
                data[$(input).attr('name')] = $(input).val();
            });
            this.model.save(data);
        },

        showPopup: function () {
            this.render();
            this.$('.modal').modal('show');
            this.listenTo(this.model, 'sync', this._saveSuccessHandler);
        },

        _saveSuccessHandler: function () {
            this.closePopup();
        },

        closePopup: function (model) {
            this.$('.modal').modal('hide');
            this.stopListening(this.model);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }
    });
});