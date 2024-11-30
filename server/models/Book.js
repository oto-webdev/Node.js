import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: [true, 'It should be at least 30 charachters']
    }

}, {
    timestamps: true
})

const Book = mongoose.model("Book", bookSchema)

export default Book;