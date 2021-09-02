import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/services/auth.service';
import { LoginUser } from 'src/store/actions/login.actions';
import { AppState } from 'src/store/state/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    public router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, Validators.required],
    });
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    this.store.dispatch(new LoginUser(this.loginForm.value));
    // this.authService.login(this.loginForm.value).subscribe(
    //   () => {
    //     if (this.authService.isLoggedIn) {
    //       this.router.navigate(['/products']);
    //     }
    //   },
    //   (_error) => {
    //     this.snackBar.open('Invalid credentials', 'Close', {
    //       duration: 3000,
    //     });
    //   }
    // );
  }
}
