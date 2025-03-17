import { book } from '@/models/books'
import { Request, Response } from 'express'

let books: book[] = []

export const getAllBooks = (req: Request, res: Response): void => {
	res.json(books)
}

export const getBookById = (req: Request, res: Response): void => {
	const book = books.find(b => b.id === parseInt(req.params.id))
	if (!book) {
		res.status(404).json({ message: 'Book not found' })
		return
	}
	res.json(book)
}

export const addBook = (req: Request, res: Response): void => {
	const newBook: book = { id: books.length + 1, ...req.body }
	books.push(newBook)
	res.status(201).json(newBook)
}
export const deleteBook = (req: Request, res: Response): void => {
	const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id))
	if (bookIndex === -1) {
		res.status(404).json({ message: 'Book not found' })
		return
	}
	const deleteBooks = books.splice(bookIndex, 1)
	res.json(deleteBooks[0])
}
