import { Component } from '@angular/core';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent {
  book: Book = { title: '', author: '', publication_date: '' };
  books: Book[] = [];

  private searchQueryChanged: Subject<string> = new Subject<string>();

  constructor(private bookService: BookService) {
    this.searchQueryChanged
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(() => this.bookService.getBooksByTitle(this.book.title))
      )
      .subscribe(
        (books) => {
          this.books = books;
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      );
  }
  onInputChange() {
    this.searchQueryChanged.next(this.book.title);
  }

  onSubmit() {
    console.log('Submitted:', this.book);
    this.bookService.addBook(this.book);
  }
}
