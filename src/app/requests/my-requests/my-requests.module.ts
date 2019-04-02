import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyRequestsPage } from './my-requests.page';
import { ApplicationPipesModule } from 'src/app/application-pipes/application-pipes.module';

const routes: Routes = [
  {
    path: '',
    component: MyRequestsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ApplicationPipesModule
  ],
  declarations: [MyRequestsPage]
})
export class MyRequestsPageModule {}
