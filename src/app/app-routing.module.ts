import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AppComponent,
} from 'src/app/components';

const routes: Routes = [
  {
    path: 'diagnostics',
    component: AppComponent,
    children: [
      { path: '', component: AppComponent },
      {
        path: '',
        redirectTo: 'diagnostics',
        pathMatch: 'full',
      },
      { path: '**', redirectTo: '' },
    ],
  },
  {
    path: '',
    redirectTo: '/diagnostics',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
