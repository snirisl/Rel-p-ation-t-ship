import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-request-message',
  templateUrl: './request-message.component.html',
  styleUrls: ['./request-message.component.scss'],
})
export class RequestMessageComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  closeMessage() {
    this.modalCtrl.dismiss({ message: 'This is a dummy message' }, 'confirm');
  }
}
