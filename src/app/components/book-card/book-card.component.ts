import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';
import { User } from 'src/app/models/user';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {

  @Input() book = new Book;

  isActive = false;
  userData$;

  constructor(private router: Router, private subscriptionService: SubscriptionService) {
    this.userData$ = new Observable<User>();
  }

  ngOnInit() {
    this.userData$ = this.subscriptionService.userData;
  }

  goToPage(id: number) {
    this.router.navigate(['/books/details/', id]);
  }
}
