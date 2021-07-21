import { SubscriptionService } from 'src/app/services/subscription.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import { takeUntil } from 'rxjs/operators';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  showPassword = true;
  userId;

  private unsubscription$ = new Subject<void>();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private subscriptionService: SubscriptionService
  ) {
    this.userId = JSON.parse(localStorage.getItem('userId') || '{}');
  }

  ngOnInit(): void {
    this.subscriptionService.userData.asObservable()
      .pipe(takeUntil(this.unsubscription$))
      .subscribe((data: User) => {
        this.userId = data.userId;
      });
  }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  get username(): any {
    return this.loginForm.get('username');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  login(): void {
    if (this.loginForm.valid) {
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      this.authService.login(this.loginForm.value)
        .pipe(
          takeUntil(this.unsubscription$)
        ).subscribe(() => {
          this.router.navigate(['/']);
        },
          () => {
            this.loginForm.reset(),
              this.loginForm.setErrors({
                invalidLogin: true,
              })
          }
        );
    }
  }

  ngOnDestroy(): void {
    this.unsubscription$.next(),
      this.unsubscription$.complete()
  }
}
