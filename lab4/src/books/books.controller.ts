import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  async getAllBooks(
    @Query('cursor') cursor: number,
    @Query('limit') limit: number = 10,
  ) {
    return this.bookService.getAllBooks(cursor, limit);
  }

  @Get(':id')
  async getBookById(@Query('id') id: number) {
    return this.bookService.getBookById(Number(id));
  }

  @Post()
  @UsePipes(ValidationPipe)
  async addBook(@Body() data: { title: string; author: string; year: number }) {
    return this.bookService.addBook(data);
  }

  @Delete(':id')
  async deleteBookById(@Param('id') id: number) {
    return this.bookService.deleteBookById(Number(id));
  }
}
