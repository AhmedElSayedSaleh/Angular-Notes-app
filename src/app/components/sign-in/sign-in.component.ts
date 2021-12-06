import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/Services/auth.service';
declare var $: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private _AuthService: AuthService, private _Router: Router) {
    if (this._AuthService.isLoggedIn()) {
      this._Router.navigate(['/profile']);
    }
  }

  signInForm = new FormGroup({
    email: new FormControl("podya@podya", [Validators.required, Validators.email]),
    password: new FormControl("PodyaPodya", [Validators.required, Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')])
  });

  formData(): any {
    if (this.signInForm.valid) {
      // console.log(this.signInForm);
      this._AuthService.signIn(this.signInForm.value).subscribe(res => {
        // console.log(res);
        if (res.message === 'success') {
          localStorage.setItem('TOKEN', res.token);
          this._Router.navigate(['/profile']);
        }
      });
    }
  }

  ngOnInit(): void {
    $('#signIn').particleground({
      directionX: 'center',
      directionY: 'center'
    });
  }

}
