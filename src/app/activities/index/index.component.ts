import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Activity } from '../../model/activity';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class ActivitiesIndexComponent implements OnInit {
  activities: any;
  subscription: Subscription;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.subscription = this.appService.activitiesChanged.subscribe(
      (activities) => {
        console.log(activities);
        this.activities = activities;
      }
    );

    this.appService.getActivities();
  }

}
