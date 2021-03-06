define('models/todo_item', ['backbone'], function (Backbone) {
    //TodoItem
    return Backbone.Model.extend({
        //url: 'http://localhost:3000/todos',
        urlRoot: '/todos',
        toggleStatus: function () {
            if (this.get('status') == 'incomplete') {
                this.set({'status': 'complete'});
            } else {
                this.set({'status': 'incomplete'});
            }
        }
    });
});