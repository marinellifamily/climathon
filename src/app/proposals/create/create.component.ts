import { Component, OnInit } from '@angular/core';
import { Proposal } from '../../model/proposal';
import { Solution } from '../../model/solu';
import { Cost } from '../../model/cost';
import { AppService } from '../../app.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { Subscription } from '../../../../node_modules/rxjs';
import { Subscription } from 'rxjs';
declare const google: any;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class ProposalsCreateComponent implements OnInit {
  model: Proposal = new Proposal();
  map;
  marker;
  geocoder;
  image;
  editMode = false;
  id = null;
  subscription: Subscription;
  solutions: Solution[] = [];
  constructor(private toastr: ToastrService, private appService: AppService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        // this.appService.showActivity(this.id);
      }
    );

    this.subscription = this.appService.proposalChange.subscribe(
      (proposal: Proposal) => {
        this.model = Object.assign(this.model, proposal);
        // const myLatlng = new google.maps.LatLng(activity.lat, activity.lng);

        // this.displayMap(myLatlng);
        this.solutions = this.model.solutions;
      }
    );

    this.appService.showProposal(this.id);

    const myLatlng = new google.maps.LatLng(18.449863, -69.663498);
    this.model.lat = 18.449863;
    this.model.lng = -69.663498;

    this.marker = new google.maps.Marker();
    this.marker.setMap(null);

    this.geocoder = new google.maps.Geocoder();
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: myLatlng,
      zoom: 15
    });
    // this.image = {
    //   url: 'https://d30y9cdsu7xlg0.cloudfront.net/png/5269-200.png',
    //   size: new google.maps.Size(71, 71),
    //   origin: new google.maps.Point(0, 0),
    //   anchor: new google.maps.Point(17, 34),
    //   scaledSize: new google.maps.Size(25, 25)
    // };
    this.displayMarker(myLatlng);
  }


  displayMarker(myLatlng) {
    this.marker = new google.maps.Marker({
      position: myLatlng,
      map: this.map,
      title: 'Direccion de la actividad',
      draggable: true,
      animation: google.maps.Animation.DROP,
    });


    google.maps.event.addListener(this.marker, 'dragend', (event) => {
      const coord = { 'location': { lat: this.marker.position.lat(), lng: this.marker.position.lng() } };
      this.model.lat = this.marker.position.lat();
      this.model.lng = this.marker.position.lng()
      const that = this;
      this.geocoder.geocode(coord, function (results, status) {
        if (status === 'OK') {
          if (results[0]) {
            console.log(results[0].formatted_address);
            that.model.address = results[0].formatted_address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
    });


    function toggleBounce() {
      if (this.marker.getAnimation() !== null) {
        this.marker.setAnimation(null);
      } else {
        this.marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }


  }

  addSolution() {
    this.solutions.push(new Solution());
  }

  addCost(index: number) {
    this.solutions[index].costs.push(new Cost());
  }

  removeCost(index, index2) {
    this.solutions[index].costs.splice(index2, 1);
    this.changeTotal(index);
  }

  removerSolution(index) {
    this.solutions.splice(index, 1);
  }

  changeTotal(index) {
    let total = 0;
    this.solutions[index].costs.forEach(element => {
      total += element.price * element.amount;
    });
    this.solutions[index].total = total;
  }

  onSubmit() {
    this.model.solutions = this.solutions;
    console.log(this.model);
    this.appService.storeProposal(this.model);

    setTimeout(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    }, 3000);
    this.notification('Ordenamiento territorial creado');
  }

  notification(message, type = 'success') {
    this.toastr.info('<span class="now-ui-icons ui-1_bell-53"></span> Exito <b>' + message + '</b>', '', {
      timeOut: 4000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-' + type + ' alert-with-icon',
      positionClass: 'toast-' + 'top' + '-' + 'right'
    });
  }

}
