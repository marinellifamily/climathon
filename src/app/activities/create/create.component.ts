import { Component, OnInit } from '@angular/core';
import { Sponsor } from '../../model/sponsor';
import { Activity } from '../../model/activity';
import { AppService } from '../../app.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

declare const google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class ActivitiesCreateComponent implements OnInit {

  id: number = null;
  editMode = false;
  sponsors: Sponsor[] = [new Sponsor()];
  model: Activity = new Activity();
  loading = false;
  subscription: Subscription;

  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute, 
    private toastr: ToastrService) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.appService.showActivity(this.id);
      }
    );

    if (this.editMode) {
      this.subscription = this.appService.activityChange.subscribe(
        (activity: Activity) => {
          this.model = Object.assign(this.model, activity);
          const myLatlng = new google.maps.LatLng(activity.lat, activity.lng);

          this.displayMap(myLatlng);
          this.sponsors = this.model.sponsors;
        }
      );
    } else {
      const myLatlng = new google.maps.LatLng(18.449863, -69.6634985);
      this.displayMap(myLatlng);
    }
  }

  displayMap(myLatlng) {
    const geocoder = new google.maps.Geocoder();

    const mapOptions = {
      zoom: 15,
      center: myLatlng,
      scrollwheel: false,

    };
    const image = {
      url: 'https://d30y9cdsu7xlg0.cloudfront.net/png/5269-200.png',
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    const marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Direccion de la actividad',
      draggable: true,
      animation: google.maps.Animation.DROP,
      icon: image
    });



    marker.addListener('click', toggleBounce);

    const infoWindow = new google.maps.InfoWindow({
      content: '<h4>Ubicacion</h4>'
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    })

    google.maps.event.addListener(marker, 'dragend', (event) => {
      const coord = { 'location': { lat: marker.position.lat(), lng: marker.position.lng() } };
      this.model.lat = marker.position.lat();
      this.model.lng = marker.position.lng()
      const that = this;
      geocoder.geocode(coord, function (results, status) {
        if (status === 'OK') {
          if (results[0]) {
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
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }
  }

  addSponser() {
    this.sponsors.push(new Sponsor());
  }

  removeSponser(index) {
    this.sponsors.splice(index, 1);
  }


  onSubmit() {
    console.log(this.model);
    this.model.sponsors = this.sponsors;
    this.appService.storeActivity(this.model);

    setTimeout(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    }, 3000);
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
