import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserType } from 'src/app/models/UserType';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  userId;
  userDataSubscription: any;
  userData= new User();
  userType = UserType;
  // wishListCount$: Observable<number>;
  // cartItemCount$: Observable<number>;
  // bookSubscriptionCount$: Observable<number>;

  constructor(
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private router: Router,) {
    this.userId = JSON.parse(localStorage.getItem('userId') || '{}');

  }

  ngOnInit(): void {
    this.userDataSubscription = this.subscriptionService.userData.asObservable().subscribe(data => { this.userData = data; });
  }
  logout() {
    // this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }
}
