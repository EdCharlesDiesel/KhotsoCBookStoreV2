import { SubscriptionService } from './subscription.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  OldUserId;
  constructor(
    private httpClient: HttpClient,
    private subscriptionService: SubscriptionService
  ) {
    this.OldUserId = JSON.parse(localStorage.getItem('oldUserId') || '{}');
  }

  login(user: User): Observable<any> {
    return this.httpClient.post<any>('https://localhost:5000/api/login', user)
      .pipe(
        map((response: any) => {
          if (response && response.token) {
            this.OldUserId = JSON.parse(localStorage.getItem('oldUserId') || '{}');
            localStorage.setItem('authToken', response.token);
            this.setUserDetails();
            localStorage.setItem('userId', response.userDetails.userId);
          }
          return response;
        })
      );
  }

  setUserDetails(): void {
    if (localStorage.getItem('authToken')) {
      const userDetails = new User()
      const decodeUserDetails = JSON.parse(atob(localStorage.getItem('authToken')!.split('.')[1]));

      userDetails.userId = decodeUserDetails.userId;
      userDetails.username = decodeUserDetails.sub;
      userDetails.userTypeId = Number(decodeUserDetails.userTypeId);
      userDetails.isLoggedIn = true;

      this.subscriptionService.userData.next(userDetails);
    }
  }

  logout(): void {
    localStorage.clear();
    this.resetSubscription();
    this.setTempUserId();
  }

  setTempUserId(): void {
    if (!localStorage.getItem('userId')) {
      const TempUserId = this.getnerateTempUserId();
      localStorage.setItem('userId', TempUserId.toString());
    }
  }

  getnerateTempUserId(): number {
    return Math.floor(Math.random() * (99999 - 11111 + 1) + 123654789);
  }

  resetSubscription() {
    this.subscriptionService.userData.next(new User);
  }
}
