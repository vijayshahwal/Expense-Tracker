const mongoose = require('mongoose');

// Counter schema for auto-incrementing ID
const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

const expenseSchema = new mongoose.Schema(
    {
        Id:{
            type:Number,
            required:true,
            unique:true,
            default: 1
        },
        Amount:{
            type:Number,
            required:true,
            maxLength:20,
        },
        Category: {
            type:String,
            required:true,
            maxLength:50,
        },
        Description: {
            type:String,
            required:true,
            maxLength:150,
        },
        DateAdded: {
            type:Date,
            required:true,
            default:Date.now(),
        },
        createdAt:{
            type:Date,
            required:true,
            default:Date.now(),
        },
        updatedAt:{
            type:Date,
            required:true,
            default:Date.now(),
        }
    }
);

// Add pre-save middleware to auto-increment ID
expenseSchema.pre('save', async function(next) {
    if (this.isNew) {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'expenseId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.Id = counter.seq;
    }
    next();
});

module.exports = mongoose.model('Expense', expenseSchema);
