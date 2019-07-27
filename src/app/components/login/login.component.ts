import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/authentication/auth.service';
import {Router} from '@angular/router';
import {RouterAccessService} from '../../services/router/routerAccess/router-access.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private routerAccessService: RouterAccessService) {
    this.authService = authService;
  }

  ngOnInit() {
  }

  async signIn(): Promise<void> {

    await this.authService.signIn();

    if (this.authService.isLogin) {

      console.log('login done');

      this.routerAccessService.setAccessRoute('/home', true);

      this.router.navigate(['home']);

    } else {

      console.log('login failed');

    }

  }

  signOut(): void {

    this.authService.signOut();

  }

}
