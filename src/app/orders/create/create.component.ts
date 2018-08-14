import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../app.service';
import { Router, ActivatedRoute } from '@angular/router';
declare const google: any;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class OrdersCreateComponent implements OnInit {
  option = '1';
  map;
  text = 'Urbanizacion';
  color = '#572364';
  rectangle;
  bounds;
  infoWindow;
  model = {
    option: null,
    reason: null,
    bounds: null
  }
  constructor(private toastr: ToastrService, private appService: AppService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const myLatlng = new google.maps.LatLng(18.449863, -69.663498);
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: myLatlng,
      zoom: 15
    });
    this.bounds = {
      north: 18.448075019029824,
      south: 18.44361524239001,
      east: -69.66209010000005,
      west: -69.67275528783574
    }
    this.infoWindow = new google.maps.InfoWindow();
    this.rectangle = new google.maps.Rectangle({
      strokeColor: '#572364',
      fillColor: '#572364',
      bounds: this.bounds,
      editable: true,
      draggable: true
    });
    this.displayMap(this.map, this.rectangle);
  }

  selectText(value) {
    switch (value) {
      case '1': {
        this.text = 'Urbanizacion';
        this.color = '#572364';
        break;
      }
      case '2': {
        this.text = 'IND';
        this.color = '#000000';
        break;
      }
      case '3': {
        this.text = 'Agropecuario';
        this.color = '#FFFF00';
        break;
      }
      case '4': {
        this.text = 'Forestal';
        this.color = '#009D71';
        break;
      }
      case '5': {
        this.text = 'Mineria';
        this.color = '#FFD700';
        break;
      }
      case '6': {
        this.text = 'Marino';
        this.color = '#0000FF';
        break;
      }
      case '7': {
        this.text = 'Servicios Esp';
        this.color = '#773525';
        break;
      }
      case '8': {
        this.text = 'Area Protegidas';
        this.color = '#E60026';
        break;
      }
    }
  }

  change(data) {
    console.log(data);
    this.selectText(data);
    this.rectangle.setMap(null);
    this.infoWindow.close();
    this.rectangle.fillColor = this.color;
    this.rectangle.strokeColor = this.color;
    // this.rectangle = new google.maps.Rectangle({
    //   strokeColor: this.color,
    //   fillColor: this.color,
    //   bounds: this.bounds,
    //   editable: true,
    //   draggable: true
    // });
    setTimeout(() => {
      this.displayMap(this.map, this.rectangle);
    }, 300);

    // this.displayMap(this.map, this.rectangle);
  }

  displayMap(map, rectangle) {

    // let infoWindow;
      // Define the rectangle and set its editable property to true.
      rectangle.setMap(map);

      // Add an event listener on the rectangle.
      rectangle.addListener('bounds_changed', showNewRect);

      // Define an info window on the map.
      const that = this;
      showNewRect(null);

    function showNewRect(event) {
      const ne = rectangle.getBounds().getNorthEast();
      const sw = rectangle.getBounds().getSouthWest();
      that.bounds = {
        north: ne.lat(),
        south: sw.lat(),
        east: ne.lng(),
        west: sw.lng()
      }
      // const contentString = '<b>Rectangle moved.</b><br>' +
      //   'New north-east corner: ' + ne.lat() + ', ' + ne.lng() + '<br>' +
      //   'New south-west corner: ' + sw.lat() + ', ' + sw.lng();

      const contentString = '<b>' + that.text + '</b><br>';

      // Set the info window's content and position.
      that.infoWindow.setContent(contentString);
      that.infoWindow.setPosition(ne);

      that.infoWindow.open(map);
    }
  }

  onSubmit() {
    this.model.option = this.option;
    this.model.bounds = this.bounds;
    console.log(this.model);
    this.appService.storeOrder(this.model);

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
