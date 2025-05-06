import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllBooks(cursor: number, limit: number) {
    const books = await this.prismaService.book.findMany({
      take: limit + 1,
      ...(cursor && {
        skip: 1,
        cursor: { id: cursor },
      }),
      orderBy: {
        id: 'asc',
      },
    });

    const hasNextPage = books.length > limit;
    const items = hasNextPage ? books.slice(0, -1) : books;
    const nextCursor = hasNextPage ? items[items.length - 1].id : null;

    return {
      items,
      nextCursor,
      hasNextPage,
    };
  }

  async getBookById(id: number) {
    const book = await this.prismaService.book.findUnique({
      where: { id },
    });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);
    return book;
  }

  async addBook(data: { title: string; author: string; year: number }) {
    {
      return this.prismaService.book.create({ data });
    }
  }

  async deleteBookById(id: number) {
    const book = await this.prismaService.book.findUnique({
      where: { id },
    });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);
    await this.prismaService.book.delete({
      where: { id },
    });
    return { id };
  }
}
