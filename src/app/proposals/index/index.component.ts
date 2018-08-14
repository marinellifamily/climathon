import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Subscription } from 'rxjs';
import { Cost } from '../../model/cost';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

export class ProposalsIndexComponent implements OnInit {
  proposals;
  subscription: Subscription;
  padron = 6765073;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.subscription = this.appService.proposalsChange.subscribe(
      (proposals) => {
        this.proposals = proposals;
      }
    )

    this.appService.getProposals();
  }


  total (costs: Cost[]) {
    let total = 0;
    costs.forEach(element => {
      total += element.amount * element.price;
    });
    return total;
  }

  porciento (value) {
    return ((value * 100) / this.padron).toFixed(4);
  }

}
