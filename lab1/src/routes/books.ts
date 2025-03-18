import { booksController } from '@/controllers/booksController'
import { validateBook } from '@/middleware/validation'
import express from 'express'

export const BooksRouter = express.Router()

BooksRouter.get('/', booksController.getAllBooks)
BooksRouter.get('/:id', booksController.getBookById)
BooksRouter.post('/', validateBook, booksController.addBook)
BooksRouter.delete('/:id', booksController.deleteBook)
