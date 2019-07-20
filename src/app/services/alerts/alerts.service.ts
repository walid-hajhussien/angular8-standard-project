import { Injectable } from '@angular/core';
import { Alert } from "../../class/alert";

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  alerts: Alert[]=[];

  constructor() { }

  add(message: string, debug: string) {
    this.alerts.push({message: message, debug: debug});
  }

  remove(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  clear(){
    this.alerts=[];
  }

}
