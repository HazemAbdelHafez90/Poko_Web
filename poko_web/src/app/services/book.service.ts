import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': environment.apiKey,
  });
  options = { headers: this.headers };
  addBook(book: Book) {
    this.http.post(environment.apiURL, book, this.options).subscribe(
      (response) => {
        console.log('Book added:', response);
        book = { title: '', author: '', publication_date: '' };
      },
      (error) => {
        console.error('Error adding book:', error);
      }
    );
  }

  getBooksByQuery(author?: string, title?: string): Observable<Book[]> {
    let params = new HttpParams();
    if (author) {
      params = params.set('author', author);
    }
    if (title) {
      params = params.set('title', title);
    }

    return this.http.get<Book[]>(environment.apiURL, {
      params: params,
      headers: this.headers,
    });
  }
}
