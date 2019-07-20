import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/authentication/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {
    this.authService=authService;
  }

  ngOnInit() {
  }

  async signIn(): Promise<void> {
    await this.authService.signIn();
    if(this.authService.isLogin){
      console.log("login done");
    }else{
      console.log("login failed");
    }

  }

  signOut(): void {
    this.authService.signOut();
  }

}
