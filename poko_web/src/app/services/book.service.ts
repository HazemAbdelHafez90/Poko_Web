import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AlertService } from '../alert.service';
@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient, private alertService: AlertService) {}
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
        this.alertService.success('Book Added !');
      },
      (error) => {
        console.error('Error adding book:', error);
        this.alertService.error('Error while adding book !');
      }
    );
  }

  getBooksByTitle(title: string): Observable<Book[]> {
    let params = new HttpParams();
    params = params.set('title', title);

    return this.http.get<Book[]>(environment.apiURL, {
      params: params,
      headers: this.headers,
    });
  }
}
