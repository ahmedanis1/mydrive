const mongoose = require('mongoose');
const fileSchema = mongoose.Schema({

    file_name: {
        type: String,
        required: true,
    },
    file_path: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
        default: new Date().toISOString()
    }
});

module.exports = mongoose.model('FileSchema', fileSchema);
