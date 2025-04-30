import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class BooksService {

  private readonly logger = new Logger('BookService')

  constructor(

    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>
  ) { }

  async create(createBookDto: CreateBookDto) {
    try {
      const book = this.bookRepository.create(createBookDto);
      await this.bookRepository.save(book);
      return book;
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Database Error')
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.bookRepository.find({
      take: limit,
      skip: offset
    })
  }

  async findOne(id: number) {

    const book = await this.bookRepository.findOneBy({ id: id })

    if (!book) {
      throw new NotFoundException("Book Not Found");
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.preload({
      id: id,
      ...updateBookDto
    });

    if (!book) {
      throw new NotFoundException("Book Not Found");
    }

    try {
      return this.bookRepository.save(book);
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Database Error')
    }


  }

  async remove(id: number) {
    const book = await this.findOne(id);
    await this.bookRepository.remove(book);
  }
}
