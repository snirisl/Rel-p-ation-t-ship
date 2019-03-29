import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestsPage } from './requests.page';
import { RequestsRoutingModule } from './requests-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestsRoutingModule
  ],
  declarations: [RequestsPage]
})
export class RequestsPageModule {}
