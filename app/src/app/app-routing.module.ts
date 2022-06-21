import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Route } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CryptocoinPageComponent } from './pages/cryptocoin-page/cryptocoin-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: '404',
    component: ErrorPageComponent,
  },
  {
    path: ':id',
    component: CryptocoinPageComponent,
  },

  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
