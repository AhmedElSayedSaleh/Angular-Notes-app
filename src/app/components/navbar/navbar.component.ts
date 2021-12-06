// import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public _AuthService: AuthService, private _Router: Router) {
    // console.log(this._location.path());

   }

  logout(): any {
    localStorage.clear();
    this._Router.navigate(['/signin']);
  }

  ngOnInit(): void {
  }

}
