import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AssignRoomsPage } from './assign-rooms.page';

const routes: Routes = [
  {
    path: '',
    component: AssignRoomsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AssignRoomsPage]
})
export class AssignRoomsPageModule {}
