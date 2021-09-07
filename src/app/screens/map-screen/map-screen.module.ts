import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapScreenComponent } from './map-screen.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [MapScreenComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'', pathMatch:'full', component:MapScreenComponent}
    ])
  ]
})
export class MapScreenModule { }
