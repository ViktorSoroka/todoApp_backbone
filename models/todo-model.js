var mongoose = require('mongoose');
var schema = mongoose.Schema;

var UseSchema = new schema({
    status: {type: String},
    description: {type: String}
});

UseSchema.set('toJSON', {
    transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model("TodoDb", UseSchema);
