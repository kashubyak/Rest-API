import { Injectable, NotFoundException } from '@nestjs/common';
import { IBook } from 'src/types/book';
import { createBookDTO } from './dto/createBook.dto';

@Injectable()
export class BooksService {
  private books: IBook[] = [];

  getAllBooks(): IBook[] {
    return this.books;
  }

  getBookById(id: number): IBook {
    const book = this.books.find((b) => b.id === id);
    if (!book) throw new Error('Book not found');
    return book;
  }

  addBook(createBookDTO: createBookDTO): IBook {
    const newBook: IBook = { id: this.books.length + 1, ...createBookDTO };
    this.books.push(newBook);
    return newBook;
  }

  async deleteBook(id: number): Promise<void> {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException('Book not found');
    }
    this.books.splice(bookIndex, 1);
  }
}
