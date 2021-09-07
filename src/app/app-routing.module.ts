import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: "search",
    pathMatch: "full"
  },
  {
    path: "search",
    loadChildren: () => import('../app/screens/search-screen/search-screen.module').then(m => m.SearchScreenModule),
  },
  {
    path: "search-results",
    loadChildren: () => import('../app/screens/map-screen/map-screen.module').then(m => m.MapScreenModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
