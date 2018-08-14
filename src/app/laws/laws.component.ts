import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../app.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
// import { Observable } from 'rxjs';


@Component({
  selector: 'app-laws',
  templateUrl: './laws.component.html',
  styleUrls: ['./laws.component.scss']
})
export class LawsComponent implements OnInit {
  closeResult: string;
  editMode: Boolean = false;
  laws;
  subscription: Subscription;
  law: string;
  index = null;
  id = null;

  constructor(private modalService: NgbModal, private appService: AppService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.subscription = this.appService.lawsChanged.subscribe(
      (laws) => {
        this.laws = laws;
      }
    );
    this.appService.getLaws();
    // console.log(this.laws);
  }

  openLg(content) {
    this.id = null;
    this.index = null;
    this.law = null;
    this.editMode = false;
    this.modalService.open(content, { size: 'lg' });
  }

  edit(index, law, content) {
    this.id = law.id;
    this.index = index;
    this.law = law.description;
    this.editMode = true;
    this.modalService.open(content, { size: 'lg' });
  }
  onSubmit() {
    if (this.editMode) {
      this.appService.updateLaw({'id': this.id, 'description': this.law }, this.index);
      this.notification('Ley editada exitosamente');
    } else {
      this.appService.storeLaw({'description': this.law});
      this.law = null;
      this.notification('Ley agregada exitosamente');
    }
  }

  delete(index) {
    this.appService.deleteLaw(index);
    this.notification('Ley eliminada exitosamente')
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
