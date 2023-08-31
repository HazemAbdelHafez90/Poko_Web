import { Component } from '@angular/core';
import { Book } from '../models/book.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent {
  book: Book = { title: '', author: '', publication_date: '' };
  constructor(private bookService: BookService) {}

  onSubmit() {
    console.log('Submitted:', this.book);
    this.bookService.addBook(this.book);
  }
}
