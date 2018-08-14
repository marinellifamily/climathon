import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare const google: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class ReportsIndexComponent implements OnInit {
  map;
  reports;
  constructor(private modalService: NgbModal, private appService: AppService) { }

  ngOnInit() {
    const myLatlng = new google.maps.LatLng(18.449863, -69.663498);
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: myLatlng,
      zoom: 15
    });

    const that = this;
    navigator.geolocation.getCurrentPosition(function (position) {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      const image = {
        url: 'https://d30y9cdsu7xlg0.cloudfront.net/png/8205-200.png',
        size: new google.maps.Size(80, 80),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(30, 30)
      };
      const marker = new google.maps.Marker({
        position: pos,
        map: that.map,
        title: 'Person',
        draggable: false,
        icon: image
      });

      const cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: that.map,
        center: pos,
        radius: 50 * 4
      });


      marker.setMap(that.map);

      // infoWindow.setPosition(pos);
      // infoWindow.setContent('Location found.');
      // infoWindow.open(map);
      // map.setCenter(pos);
    }, function () {
      // handleLocationError(true, infoWindow, map.getCenter());
    });


    this.appService.reportsChange.subscribe(
      (reports) => {
        this.reports = reports;
        this.reports.forEach(element => {
          const val = this.selectText(element.type);
          const ll = new google.maps.LatLng(element.lat, element.lng);
          this.addMarker(ll, val, element);
        });
      }
    );

    this.appService.getReports();
  }


  selectText(value) {
    console.log(value);
    value = value + '';
    let values = { image: null, text: null };
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
          text: 'Contaminación Sonora'
        };
        break;
      }
      case '3': {
        values = {
          image: 'http://www.iconarchive.com/download/i103443/paomedia/small-n-flat/map-marker.ico',
          text: 'Contaminación Ambiental'
        };
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


  addMarker(myLatlng, val, el) {
    const x = 71 + (el.level * 4);
    const y = 25 + (el.level * 4);

    const image = {
      url: val.image,
      size: new google.maps.Size(x, x),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(y, y)
    };
    const marker = new google.maps.Marker({
      position: myLatlng,
      map: this.map,
      title: 'Direccion de la actividad',
      draggable: false,
      animation: google.maps.Animation.DROP,
      icon: image
    });

    marker.setMap(this.map);
    const infoWindow = new google.maps.InfoWindow();
    const contentString = '<b>' + el.name + ' (' + val.text + ' )</b><br>'
     + el.description + '<br><b> Nivel: </b>' + el.level + '<b>, Confirmaciones: </b>' + el.confirmations
     + '<br> ' + el.address
     + '<br> <button class="btn btn-info pull-left">Confirmar</button> <b class="pull-right mt-3">'
     + el.created_at + '</b>';
    infoWindow.setContent(contentString);

    marker.addListener('click', () => {
      infoWindow.open(this.map, marker);
    })

    function toggleBounce() {
      if (this.marker.getAnimation() !== null) {
        this.marker.setAnimation(null);
      } else {
        this.marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }
  }

  showModal() {
    console.log('sdsdsd');
    this.modalService.open('content', { size: 'lg' });
  }

}
