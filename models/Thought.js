const mongoose = require('mongoose');

const ReactionSchema = new mongoose.Schema({
    reactionId: {
        type: String,
        unique: true,
        required: true
    },
    reactionBody: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    createdAt: {
        type: String,
        unique: true,
        required: true
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