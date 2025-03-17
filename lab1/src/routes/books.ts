import {
	addBook,
	deleteBook,
	getAllBooks,
	getBookById,
} from '@/controllers/booksController'
import { validateBook } from '@/middleware/validation'
import express from 'express'
export const BooksRouter = express.Router()

BooksRouter.get('/', getAllBooks)
BooksRouter.get('/:id', getBookById)
BooksRouter.post('/', validateBook, addBook)
BooksRouter.delete('/:id', deleteBook)
