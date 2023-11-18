const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const userTasks = mongoose.Schema({
    taskName: String,
    description: String,
    status: String,
    userId: ObjectId,
    addedBy: {
        type:ObjectId,
        default:null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('usertasks',userTasks);