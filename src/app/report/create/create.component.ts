import { Component, OnInit } from '@angular/core';
import { Report } from '../../model/Report';
import { AppService } from '../../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

declare const google: any;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class ReportsCreateComponent implements OnInit {
  map;
  geocoder;
  image;
  marker;
  model: Report = new Report();
  laws = [{ id: null, decription: null }];
  lawsx;
  infoWindow;
  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.appService.lawsChanged.subscribe(
      (laws) => {
        this.lawsx = laws;
      }
    );
    this.appService.getLaws();
    this.model.level = 1;

    this.infoWindow = new google.maps.InfoWindow();
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

    this.image = {
      url: 'https://d30y9cdsu7xlg0.cloudfront.net/png/5269-200.png',
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    // this.displayMarker(myLatlng);

  }

  change(data) {
    this.marker.setMap(null);
    const v = this.selectText(data);
    this.image.url = v.image;
    console.log(this.model.level);
    const x = 71 + (this.model.level * 4);
    const y = 25 + (this.model.level * 4);
    this.image.size = new google.maps.Size(x, x);
    this.image.scaledSize = new google.maps.Size(y, y)
    const myLatlng = new google.maps.LatLng(this.model.lat, this.model.lng);
    this.displayMarker(v, myLatlng);
  }

  change2(data) {
    if (this.model.type) {
      this.change(this.model.type);
    }
  }

  addLaw() {
    this.laws.push({ id: null, decription: null});
  }

  removeLaw(index) {
    this.laws.splice(index, 1);
  }


  selectText(value) {
    let values = {image: null, text: null};
    switch (value) {
      case '1': {
        values = {
          image: 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/256/Map-Marker-Bubble-Azure-icon.png', 
          text: 'Tubería y alcantarillado'
        };
        break;
      }
      case '2': {
        values = {
          image: 'http://www.iconarchive.com/download/i57835/icons-land/vista-map-markers/Map-Marker-Marker-Outside-Pink.ico', 
          text: 'Contaminación Sonora' };
        break;
      }
      case '3': {
        values = {
          image: 'http://www.iconarchive.com/download/i103443/paomedia/small-n-flat/map-marker.ico',
        text: 'Contaminación Ambiental'};
        break;
      }
      case '4': {
        values = {
          image: 'http://inclinition.com/wp-content/uploads/2016/11/marker-map-1.png',
          text: 'Uso De Zonas No Autorizadas'
        };
        break;
      }
    }

    return values;
  }


  displayMarker(value, myLatlng) {
    this.marker = new google.maps.Marker({
      position: myLatlng,
      map: this.map,
      title: 'Direccion de la actividad',
      draggable: true,
      animation: google.maps.Animation.DROP,
      icon: this.image
    });


    google.maps.event.addListener(this.marker, 'dragend', (event) => {
      const coord = { 'location': { lat: this.marker.position.lat(), lng: this.marker.position.lng() } };
      this.model.lat = this.marker.position.lat();
      this.model.lng = this.marker.position.lng()
      const that = this;
      this.geocoder.geocode(coord, function (results, status) {
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

      this.infoWindow.setContent('<h5>' + value.text + '</h5>');
      this.infoWindow.open(that.map);

    });


    function toggleBounce() {
      if (this.marker.getAnimation() !== null) {
        this.marker.setAnimation(null);
      } else {
        this.marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }


  }

  onSubmit() {
    this.model.laws = this.laws;

    this.appService.storeReport(this.model);
    this.notification('Reporte generado');
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
