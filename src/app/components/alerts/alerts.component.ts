import { Component, OnInit } from '@angular/core';
import { AlertsService } from "../../services/alerts/alerts.service";
import { Alert } from "../../class/alert";

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  constructor(private alertsService: AlertsService) {
    this.alertsService=alertsService;
  }

  ngOnInit() {
  }

  close(alert: Alert) {
    this.alertsService.remove(alert);
  }

}
