import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL: string;
  constructor(private httpClient: HttpClient) {
    this.baseURL = 'https://localhost:5000/api/user/';
  }

  registerUser(userDetails: any) {
    return this.httpClient.post(this.baseURL, userDetails)
  }

  getCartItemCount(userId: number) {
    return this.httpClient.get(this.baseURL + userId)
  }

  validateUserName(userName: string){
return this.httpClient.get(this.baseURL + 'validateUserName/' + userName);
  }
}
