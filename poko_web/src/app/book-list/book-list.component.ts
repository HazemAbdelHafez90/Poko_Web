import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent {
  books: Book[] = [];
  author: string = '';
  title: string = '';

  constructor(private bookService: BookService) {}

  searchBooks(author: string, title: string) {
    this.bookService.getBooksByQuery(author, title).subscribe(
      (books) => {
        this.books = books;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }
}
