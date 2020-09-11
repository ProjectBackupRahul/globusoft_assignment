const mongoose = require('mongoose');

var deviceSchema = new mongoose.Schema({
    deviceName: {
        type: String,
        required: 'This field is required.'
    },
    macAddress: {
        type: String,
        required: 'This field is required.'
    },
    manufacturer: {
        type: String,
        required: 'This field is required.'
    },
    modelNo: {
        type: String
    }
});

mongoose.model('Device', deviceSchema);