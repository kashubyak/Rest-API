import {
  INestApplication,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { IBook } from 'src/types/book';
import * as request from 'supertest';
import { BooksService } from '../books.service';
import { createBookDTO } from '../dto/createBook.dto';

describe('BooksService (e2e)', () => {
  let app: INestApplication;
  let booksService = {
    getAllBooks: jest.fn().mockReturnValue([]),
    getBookById: jest.fn(),
    addBook: jest.fn(),
    deleteBook: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(BooksService)
      .useValue(booksService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/books (GET) - should return all books', async () => {
    booksService.getAllBooks.mockReturnValue([]);
    const response = await request(app.getHttpServer())
      .get('/books')
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('/books/:id (GET) - should return a single book by id', async () => {
    const mockBook: IBook = {
      id: 1,
      title: 'Test Book',
      author: 'Test Author',
      year: 2023,
    };
    booksService.getBookById.mockReturnValue(mockBook);

    const response = await request(app.getHttpServer())
      .get('/books/1')
      .expect(200);
    expect(response.body).toEqual(mockBook);
  });

  it('/books (POST) - should create a new book', async () => {
    const newBook: createBookDTO = {
      title: 'New Test Book',
      author: 'New Author',
      year: 2024,
    };

    const createdBook: IBook = { id: 1, ...newBook };
    booksService.addBook.mockReturnValue(createdBook);

    const response = await request(app.getHttpServer())
      .post('/books')
      .send(newBook)
      .expect(201);
    expect(response.body).toMatchObject(newBook);
    expect(response.body).toHaveProperty('id');
  });

  it('/books/:id (DELETE) - should delete a book by id', async () => {
    const mockBook: IBook = {
      id: 1,
      title: 'New Test Book',
      author: 'New Author',
      year: 2024,
    };

    booksService.addBook.mockReturnValue(mockBook);
    booksService.deleteBook.mockReturnValue(mockBook);

    const createdBookResponse = await request(app.getHttpServer())
      .post('/books')
      .send(mockBook)
      .expect(201);
    const createdBook: IBook = createdBookResponse.body;

    await request(app.getHttpServer())
      .delete(`/books/${createdBook.id}`)
      .expect(200);

    booksService.deleteBook.mockImplementation(() => {
      throw new NotFoundException('Book not found');
    });

    await request(app.getHttpServer())
      .delete(`/books/${createdBook.id}`)
      .expect(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
