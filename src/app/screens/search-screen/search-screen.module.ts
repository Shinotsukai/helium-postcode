import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchScreenComponent } from './search-screen.component';



@NgModule({
  declarations: [SearchScreenComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'', pathMatch:'full', component:SearchScreenComponent}
    ])
  ]
})
export class SearchScreenModule { }
