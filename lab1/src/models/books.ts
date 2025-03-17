import Joi from 'joi'

export interface book {
	id: number
	title: string
	author: string
	year: number
}
export const bookSchema = Joi.object({
	id: Joi.number().integer().min(1),
	title: Joi.string().min(3).max(100).required(),
	author: Joi.string().min(3).max(50).required(),
	year: Joi.number().integer().min(1500).max(new Date().getFullYear()).required(),
})
