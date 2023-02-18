import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {

  @Input() errorMessage;


  constructor(private activeModalService: NgbActiveModal) { }

  ngOnInit(): void { }

  close() {
    this.activeModalService.close();
  }
}
