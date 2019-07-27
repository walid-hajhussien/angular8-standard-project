import {Injectable} from '@angular/core';

import {MsalService} from '@azure/msal-angular';
import { Client } from '@microsoft/microsoft-graph-client';
import {AlertsService} from '../alerts/alerts.service';
import {MicrosoftGraphConfig} from '../../const/microsoftGraphConfig';
import {User} from '../../class/user';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authenticated: boolean;
  public isUserData: boolean;
  public isAccessToken: boolean;
  public isLogin: boolean;
  public user: User;
  private token: string;

  constructor(private msalService: MsalService, private alertsService: AlertsService) {
    this.authenticated = false;
    this.isAccessToken = false;
    this.isUserData = false;
    this.isLogin = false;
    this.msalService = msalService;
    this.alertsService = alertsService;
  }

  // Prompt the user to sign in and
  // grant consent to the requested permission scopes
  async signIn(): Promise<void> {
    let result = await this.msalService.loginPopup(MicrosoftGraphConfig.scopes)
      .catch((reason) => {
        console.log('ERROR stage 1', reason);
        this.alertsService.clear();
        this.alertsService.add('Login failed', JSON.stringify(reason, null, 2));
      });

    if (result) {
      console.log('stage 1 pass', result);
      this.authenticated = true;

      // get user data
      this.user = await this.getUser();

    }
  }

  // Sign out
  signOut(): void {
    this.msalService.logout();
    this.user = null;
    this.authenticated = false;
  }



  // Silently request an access token
  async getAccessToken(): Promise<string> {
    let result = await this.msalService.acquireTokenSilent(MicrosoftGraphConfig.scopes)
      .catch((reason) => {
        this.alertsService.clear();
        this.alertsService.add('Get token failed', JSON.stringify(reason, null, 2));
      });

    // Temporary to display token in an error box
    if (result){
      console.log('stage 2 pass AccessToken ', result);
      this.token = result;
      this.isAccessToken = true;
      return result;
    }
  }


// get user data
  private async getUser(): Promise<User> {
    if (!this.authenticated){
      return null;
    }

    let graphClient = Client.init({
      // Initialize the Graph client with an auth
      // provider that requests the token from the
      // auth service
      authProvider: async(done) => {
        let token = await this.getAccessToken()
          .catch((reason) => {
            done(reason, null);
          });

        if (token) {
          done(null, token);
        } else {
          done('Could not get an access token', null);
        }
      }
    });

    // Get the user from Graph (GET /me)
    let graphUser = await graphClient.api('/me').get();

    let user = new User();

    if (graphUser) {
      console.log('stage3 get user data ', graphUser);
      user.displayName = graphUser.displayName;
      // Prefer the mail property, but fall back to userPrincipalName
      user.email = graphUser.mail || graphUser.userPrincipalName;
      this.isLogin = true;
      return user;
    } else {
      this.alertsService.clear();
      this.alertsService.add('Get user data failed', 'Could not get user data');
      return null;
    }

  }
}
