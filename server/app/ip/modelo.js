var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ipSchema = new Schema({
    ip: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    contador: {
        type: Number,
        required: true
    }
});

var IP = mongoose.model('ips', ipSchema);

module.exports = IP; 