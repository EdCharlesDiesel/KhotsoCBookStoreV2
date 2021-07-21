import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Book } from '../models/book';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  userData = new BehaviorSubject<User>(new User());
  searchItemValue$ = new BehaviorSubject<string>('');
  wishlistItemcount$ = new Subject<number>();
  wishlistItem$ = new BehaviorSubject<Book[]>([]);
  cartItemcount$ = new Subject<number>();
  bookSubItemcount$ = new Subject<number>();

  bookSubscriptionItem$ = new BehaviorSubject<Book[]>([]);
  bookSubscriptionItemcount$ = new Subject<number>();
}
