import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddBookArgs } from "./args/addBook.args";
import { UpdateBookArgs } from "./args/updateBook.args";
import { BookEntity } from "./entity/book.entity";


@Injectable()
export class BookService {

    constructor(@InjectRepository(BookEntity) public readonly bookRepo : Repository<BookEntity>) {}
    

    async findAllBooks(): Promise<BookEntity[]>{
        let books = await this.bookRepo.find();
        return books;
    }

    async findBookById(id: number): Promise<BookEntity>{
        let book = await this.bookRepo.findOne({ where: {id: id}});
        return book;
    }

    async deleteBook(id: number): Promise<string>{
        await this.bookRepo.delete(id);
        return "Book is deleted";
    }

    async addBook(addBookArgs: AddBookArgs): Promise<string> {
        let book: BookEntity = new BookEntity();
        book.title = addBookArgs.title;
        book.price = addBookArgs.price;
        await this.bookRepo.save(book);
        return "Book is added";
    }

    async updateBook(updateBookArgs: UpdateBookArgs): Promise<string> {
        let book: BookEntity = await this.bookRepo.findOne({
            where: {
                id: updateBookArgs.id
            }
        })
        book.title = updateBookArgs.title;
        book.price = updateBookArgs.price;
        await this.bookRepo.save(book);
        return "Book is updated";
    }
}