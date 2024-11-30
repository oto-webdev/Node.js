import expressAsyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import Book from '../models/Book.js'

export const getAllBooks = expressAsyncHandler(async (req, res) => {
    try{
        const book = await Book.find()
        return res.status(200).json({message: "All Books", book})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
})

export const createBook = expressAsyncHandler(async (req, res) => {
    const {title, description} = req.body;

    try{
        const book = await Book.create({
            title,
            description
        })
        return res.status(201).json({message: "New Book", book})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
})

export const getBook = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: "Invalid Id"})
    }

    try{
        const book = await Book.findById(id)
        return res.status(200).json({message: "Book Found", book})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
})

export const updateBook = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: "Invalid Id"})
    }

    const updatedBook = req.body;

    try{
        const book = await Book.findByIdAndUpdate(id, updatedBook, {new: true})
        return res.status(200).json({message: "Book Updated", book})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
})

export const deleteBook = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: "Invalid Id"})
    }

    try{
        const book = await Book.findByIdAndDelete(id)
        return res.status(200).json({message: "Book Deleted", book})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
})