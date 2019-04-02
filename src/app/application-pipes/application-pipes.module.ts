import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../filter.pipes';
import { ArraySortPipe } from '../arraySort.pipes';

@NgModule({
  declarations: [FilterPipe, ArraySortPipe],
  imports: [
    CommonModule
  ],
  exports: [FilterPipe, ArraySortPipe]
})
export class ApplicationPipesModule { }
