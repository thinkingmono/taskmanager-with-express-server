const mongoose = require('mongoose')

//Data schema. Mongoose will do all controls and validations to asure the data matches the criteria.
const TaskSchema = new mongoose.Schema({
    // Validation
    name: {
        type: String,
        required: [true, 'must provide a name'],
        trim: true,
        maxlength: [50, 'name can not be more than 20 characters']
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task', TaskSchema)