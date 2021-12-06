import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
declare var $: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  isClicked = false;
  resMessage = '';
  isSuccess = false;
  isError = false;

  constructor(private _AuthService: AuthService) { }

  signUpForm = new FormGroup({
    first_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
    last_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
    age: new FormControl(null,  [Validators.required, Validators.min(16)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')])
  });

  formData(): any{

    this.isClicked = true;

    if (this.signUpForm.valid){
      // console.log(this.signUpForm.value);
      this._AuthService.signUp(this.signUpForm.value).subscribe(response => {
        if (response.message === 'success'){
          this.isClicked = false;
          this.isError = false;
          this.isSuccess = true;
          setTimeout(() => this.isSuccess = false, 3000);
          this.resMessage = response.message;
          this.signUpForm.reset();
        }
        else {
          this.isClicked = false;
          this.isSuccess = false;
          this.isError = true;
          this.resMessage = response.errors.email.message;
          // console.log(this.signUpForm);
        }
        // console.log(response);
      });
    }
  }

  ngOnInit(): void {
    $('#signUp').particleground({
      directionX: 'center',
      directionY: 'center'
    });
  }

}
