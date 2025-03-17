import express from 'express'
import { BooksRouter } from './routes/books'

const app = express()
app.use(express.json())
app.use('/api/books', BooksRouter)
const PORT = 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
