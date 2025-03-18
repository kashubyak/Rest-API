import { book } from '@/models/books'
import { Request, Response } from 'express'

class BooksController {
	private books: book[] = []

	getAllBooks = (req: Request, res: Response): void => {
		res.json(this.books)
	}

	getBookById = (req: Request, res: Response): void => {
		const book = this.books.find(b => b.id === parseInt(req.params.id))
		if (!book) {
			res.status(404).json({ message: 'Book not found' })
			return
		}
		res.json(book)
	}

	addBook = (req: Request, res: Response): void => {
		const newBook: book = { id: this.books.length + 1, ...req.body }
		this.books.push(newBook)
		res.status(201).json(newBook)
	}

	deleteBook = (req: Request, res: Response): void => {
		const bookIndex = this.books.findIndex(b => b.id === parseInt(req.params.id))
		if (bookIndex === -1) {
			res.status(404).json({ message: 'Book not found' })
			return
		}
		const deletedBook = this.books.splice(bookIndex, 1)
		res.json(deletedBook[0])
	}
}

export const booksController = new BooksController()
