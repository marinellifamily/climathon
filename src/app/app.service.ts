import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Activity } from './model/activity';
import { Proposal } from './model/proposal';


const BACKEND_DOMAIN = 'http://localhost/climathon/public/api/';
const DEFAULT_TOKEN_STORAGE_KEY = 'AUTH_TOKEN';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    token: string;
    laws = [];
    lawsChanged = new Subject();

    activities: Activity[] = [];
    activitiesChanged = new Subject();
    activityChange = new Subject();

    orders = [];
    ordersChange = new Subject();

    reports = [];
    reportsChange = new Subject();

    proposals = [];
    proposalsChange = new Subject();
    proposalChange = new Subject();
    loading = new Subject();

    constructor(private httpClient: HttpClient) {}

    // signUp(user: User) {
    //     return this.httpClient.post('https://ng-project-4ba1e.firebaseio.com/recipes.json',
    //         this.recipeService.getRecipes(), {
    //             // params: new HttpParams().set('auth')
    //         });
    // }

    getLaws() {
        this.httpClient.get<string[]>(BACKEND_DOMAIN + 'laws').subscribe(
            (laws) => {
                this.setLaws(laws);
            }
        )
    }


    setLaws(laws) {
        this.laws = laws;
        this.lawsChanged.next(this.laws.slice());
    }

    addLaw(law) {
        this.laws.push(law);
        this.lawsChanged.next(this.laws.slice());
    }
    editLaw(law, index) {
        this.laws[index] = law;
        this.lawsChanged.next(this.laws.slice());
    }
    storeLaw(law) {
        this.httpClient.post(BACKEND_DOMAIN + 'laws', law).subscribe(
            (lawx) => {
                this.addLaw(lawx);
            }
        )
    }

    updateLaw(law, index) {
        console.log(BACKEND_DOMAIN + 'laws/' + law.id);
        this.httpClient.put(BACKEND_DOMAIN + 'laws/' + law.id, law).subscribe(
            (lawx) => {
                this.editLaw(lawx, index);
            }
        )
    }

    deleteLaw(index) {
        const law = this.laws[index];
        this.httpClient.post(BACKEND_DOMAIN + 'laws/' + law.id + 'delete', law);
        this.laws = this.laws.filter(l => l.id !== law.id);
        this.lawsChanged.next(this.laws.slice());

    }


    getActivities() {
        this.httpClient.get<Activity[]>(BACKEND_DOMAIN + 'activities').subscribe(
            (activities) => {
                this.setActivity(activities);
            }
        )
    }


    setActivity(activities) {
        console.log(activities);
        this.activities = activities;
        this.activitiesChanged.next(this.activities.slice());
    }

    addActivity(law) {
        this.activities.push(law);
        this.activitiesChanged.next(this.activities.slice());
    }

    showActivity(id) {
        this.httpClient.get(BACKEND_DOMAIN + 'activities/' + id).subscribe(
            (activity) => {
                this.activityChange.next(activity);
            }
        )
    }
    storeActivity(activity: Activity) {
        this.loading.next(true);
        this.httpClient.post(BACKEND_DOMAIN + 'activities', activity).subscribe(
            (activityx) => {
                console.log(activityx);
                this.addActivity(activityx);
                this.loading.next(false);
            }
        )
    }

    updateActivity(law, index) {
        console.log(BACKEND_DOMAIN + 'laws/' + law.id);
        this.httpClient.put(BACKEND_DOMAIN + 'laws/' + law.id, law).subscribe(
            (lawx) => {
                this.editLaw(lawx, index);
            }
        )
    }

    getOrders() {
        this.httpClient.get<Activity[]>(BACKEND_DOMAIN + 'orders').subscribe(
            (orders) => {
                this.orders = orders;
                this.ordersChange.next(this.orders.slice());
            }
        )
    }

    storeOrder(order) {
        this.loading.next(true);
        this.httpClient.post(BACKEND_DOMAIN + 'orders', order).subscribe(
            (storex) => {
                console.log(storex);
            }
        )
    }

    getReports() {
        this.httpClient.get<Activity[]>(BACKEND_DOMAIN + 'reports').subscribe(
            (reports) => {
                this.reports = reports;
                this.reportsChange.next(this.reports.slice());
            }
        )
    }

    storeReport(report) {
        this.loading.next(true);
        this.httpClient.post(BACKEND_DOMAIN + 'reports', report).subscribe(
            (reportx) => {
                console.log(reportx);
            }
        )
    }

    storeProposal(proposal) {
        this.loading.next(true);
        this.httpClient.post(BACKEND_DOMAIN + 'proposals', proposal).subscribe(
            (proposalx) => {
                console.log(proposalx);
            }
        )
    }

    getProposals() {
        this.httpClient.get<Proposal[]>(BACKEND_DOMAIN + 'proposals').subscribe(
            (proposals) => {
                this.proposals = proposals;
                this.proposalsChange.next(this.proposals.slice());
            }
        )
    }

    showProposal(id) {
        this.httpClient.get(BACKEND_DOMAIN + 'proposals/' + id).subscribe(
            (proposal) => {
                this.proposalChange.next(proposal);
            }
        )
    }

}
