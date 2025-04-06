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
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import { createBookDTO } from './dto/createBook.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  @ApiOperation({ description: 'Get all books' })
  @ApiQuery({
    name: 'cursor',
    required: false,
    description: 'Cursor for pagination',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit for pagination',
    type: Number,
  })
  async getAllBooks(
    @Query('cursor') cursor: number,
    @Query('limit') limit: number = 10,
  ) {
    return this.bookService.getAllBooks(cursor, limit);
  }

  @Get(':id')
  @ApiOperation({ description: 'Get book by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Book found' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async getBookById(@Param('id') id: number) {
    return this.bookService.getBookById(Number(id));
  }

  @Post()
  @ApiOperation({ description: 'Add a new book' })
  @ApiResponse({ status: 201, description: 'Book successfully created' })
  @UsePipes(ValidationPipe)
  async addBook(@Body() data: createBookDTO) {
    return this.bookService.addBook(data);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete book by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Book successfully deleted' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async deleteBookById(@Param('id') id: number) {
    return this.bookService.deleteBookById(Number(id));
  }
}
