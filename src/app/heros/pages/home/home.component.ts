import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container{
      margin: 10px;
    }
    .spacer{
      flex: 1 1 auto;
    }
  `]
})
export class HomeComponent implements OnInit {

  get auth(){
    return this._authService.auth;
  }



  constructor(private _router: Router, private _authService: AuthService) { }

  logout(){
    this._router.navigate(['./auth'])
  }


  ngOnInit(): void {
  }

}
