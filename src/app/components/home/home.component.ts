import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from 'src/app/models/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { switchMap } from 'rxjs/operators';
import { SubscriptionService } from 'src/app/services/subscription.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public books: Book[] = [];
  public filteredBooks: Book[] = [];
  category = '';
  priceRange = Number.MAX_SAFE_INTEGER;
  isLoading = false;
  searchItem = '';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private subscriptionService: SubscriptionService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getAllBookData();

  }

  getAllBookData(): void {
    this.bookService.books$.pipe(switchMap(
      (data: Book[]) => {
        this.filteredBooks = data;
        return this.route.queryParams;
      }
    )).subscribe(params => {
  //    this.category = params.category;
      this.filterBookData();
    });
  }

  filterPrice(value: number): any {
    this.priceRange = value;
    this.filterBookData();
  }

  filterBookData(): any {
    const filteredData = this.filteredBooks.filter(b => b.purchasePrice <= this.priceRange).slice();

    if (this.category) {
      this.books = filteredData.filter(b => b.category.toLowerCase() === this.category.toLowerCase());
    } else {
      this.books = filteredData;
    }
    this.isLoading = false;
  }

}
