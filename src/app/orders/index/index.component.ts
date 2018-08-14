import { Component, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs';
import { AppService } from '../../app.service';
import { Subscription } from 'rxjs';

declare const google: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class OrdersIndexComponent implements OnInit {
  map;
  orders: any;
  subscription: Subscription;
  sharpes = [];
  coords = null;
  reports;
  options = [
    { text: 'Urbanizacion', color: '#572364' },
    { text: 'Industrial', color: '#000000' },
    { text: 'Agropecuario', color: '#FFFF00' },
    { text: 'Forestal', color: '#009D71' },
    { text: 'Mineria', color: '#FFD700' },
    { text: 'Marino', color: '#0000FF' },
    { text: 'Servicios Esp', color: '#773525' },
    { text: 'Area Protegidas', color: '#E60026' }
  ];

  constructor(private appService: AppService) { }

  ngOnInit() {
    const myLatlng = new google.maps.LatLng(18.449863, -69.663498);
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: myLatlng,
      zoom: 15
    });


    this.subscription = this.appService.ordersChange.subscribe(
      (orders) => {
        console.log(orders);
        this.orders = orders;

        this.orders.forEach(element => {
          const option = this.selectText(element.option);
          console.log(option);
          this.addShape({
            north: element.north,
            south: element.south,
            east: element.east,
            west: element.west
          }, option, element.reason);
        });
      }
    );

    this.appService.getOrders();


  }

  selectText(value) {
    value = value + '';
    let values = {text: null, color: null};
    switch (value) {
      case '1': {
        values = {text: 'Urbanizacion', color: '#572364'};
        // this.color = '#572364';
        break;
      }
      case '2': {
        values = { text: 'Industrial', color: '#000000' };
        break;
      }
      case '3': {
        values = { text: 'Agropecuario', color: '#FFFF00' };
        break;
      }
      case '4': {
        values = { text: 'Forestal', color: '#009D71' };

        break;
      }
      case '5': {
        values = { text: 'Mineria', color: '#FFD700' };
        break;
      }
      case '6': {
        values = { text: 'Marino', color: '#0000FF' };
        break;
      }
      case '7': {
        values = { text: 'Servicios Esp', color: '#773525' };
        break;
      }
      case '8': {
        values = { text: 'Area Protegidas', color: '#E60026' };
        break;
      }
    }
    console.log(value);
    return values;
  }


  addShape(bounds, coords, reason) {
    const rectangle = new google.maps.Rectangle({
      strokeColor: coords.color,
      fillColor: coords.color,
      bounds: bounds,
      editable: false,
      draggable: false
    });

    rectangle.setMap(this.map);
    const infoWindow = new google.maps.InfoWindow();
    const that = this;

    rectangle.addListener('click', showNewRect);
    function showNewRect(event) {
      const ne = rectangle.getBounds().getNorthEast();
      const sw = rectangle.getBounds().getSouthWest();

      // const contentString = '<b>Rectangle moved.</b><br>' +
      //   'New north-east corner: ' + ne.lat() + ', ' + ne.lng() + '<br>' +
      //   'New south-west corner: ' + sw.lat() + ', ' + sw.lng();

      const contentString = '<b>' + coords.text + '</b><br>' + reason;

      // Set the info window's content and position.
      infoWindow.setContent(contentString);
      infoWindow.setPosition(ne);

      infoWindow.open(that.map);
    }
  }


}
