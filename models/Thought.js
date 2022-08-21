const mongoose = require('mongoose');

const ReactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId() 
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => date.toLocaleDateString("es-MX"),
    },
});

const ThoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => date.toLocaleDateString("es-MX"),
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
});

const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;