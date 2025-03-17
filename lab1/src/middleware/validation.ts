import { bookSchema } from '@/models/books'
import { NextFunction, Request, Response } from 'express'

export const validateBook = (req: Request, res: Response, next: NextFunction) => {
	const { error } = bookSchema.validate(req.body, { abortEarly: false })
	if (error) {
		res.status(400).json({ errors: error.details.map(err => err.message) })
		return
	}
	next()
}
