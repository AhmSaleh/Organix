import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private activateModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.activateModal.close();
  }
}
