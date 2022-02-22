import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { Auth } from "../../interfaces/auth.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(private _router: Router, private _authService: AuthService) { }

  login(){
    // go to backend...
    // user

    this._authService.login().subscribe(res=>{
      if(res.id){
        
        this._router.navigate(['./heros'])
      }
    })


  }

}
