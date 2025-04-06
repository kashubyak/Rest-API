import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import { BooksService } from '../books.service';

describe('BooksController (e2e)', () => {
  let app: INestApplication;
  let booksService = {
    getAllBooks: jest.fn(),
    getBookById: jest.fn(),
    addBook: jest.fn(),
    deleteBookById: jest.fn(),
  };
  beforeAll(async () => {
    const moduleMixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(BooksService)
      .useValue(booksService)
      .compile();
    app = moduleMixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/books (GET)', () => {
    const mockBooks = [
      {
        id: 1,
        title: 'Book 1',
        author: 'Author 1',
        year: 2021,
      },
      {
        id: 2,
        title: 'Book 2',
        author: 'Author 2',
        year: 2022,
      },
    ];
    booksService.getAllBooks.mockResolvedValue(mockBooks);
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect(mockBooks);
  });

  it('/books/:id (GET)', () => {
    const mockBooks = {
      id: 1,
      title: 'Book 1',
      author: 'Author 1',
      year: 2021,
    };
    booksService.getBookById.mockResolvedValue(mockBooks);
    return request(app.getHttpServer())
      .get('/books/1')
      .expect(200)
      .expect(mockBooks);
  });

  it('/books (POST)', () => {
    const newBook = {
      title: 'newBooks',
      author: 'newBooks',
      year: 2021,
    };
    const createBook = { id: 3, ...newBook };
    booksService.addBook.mockResolvedValue(createBook);
    return request(app.getHttpServer())
      .post('/books')
      .send(newBook)
      .expect(201)
      .expect(createBook);
  });

  it('/books/:id (DELETE)', () => {
    const mockBooks = {
      id: 1,
      title: 'Book 1',
      author: 'Author 1',
      year: 2021,
    };
    booksService.deleteBookById.mockResolvedValue(mockBooks);
    return request(app.getHttpServer())
      .delete('/books/1')
      .expect(200)
      .expect(mockBooks);
  });

  afterAll(async () => {
    await app.close();
  });
});
