import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IBook } from 'src/types/book';
import { BooksService } from './books.service';
import { createBookDTO } from './dto/createBook.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAllBooks(): IBook[] {
    return this.booksService.getAllBooks();
  }
  @Get(':id')
  getBookById(@Param(':id') id: number): IBook {
    return this.booksService.getBookById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  addBook(@Body() createBookDTO: createBookDTO): IBook {
    return this.booksService.addBook(createBookDTO);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: number): IBook {
    return this.booksService.deleteBook(id);
  }
}
