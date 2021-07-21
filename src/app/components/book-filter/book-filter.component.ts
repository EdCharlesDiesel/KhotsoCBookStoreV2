import { Component, OnInit, Input } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { catchError } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { Categories } from 'src/app/models/catergories';


@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.scss']
})
export class BookFilterComponent implements OnInit {

  @Input() category: any;

  categories$;

  constructor(private bookService: BookService  ) {
    this.categories$ = new Observable<Categories[]>();
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): any {
    this.categories$ = this.bookService.categories$
      .pipe(
        catchError(error => {
          console.log('Error ocurred while fetching category List : ', error);
          return EMPTY;
        }));
  }
}
