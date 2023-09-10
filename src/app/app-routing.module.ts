import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { JurisprudenciaComponent } from './jurisprudencia/jurisprudencia.component';

const routes: Routes = [
  { path: 'jurisprudencia', component: JurisprudenciaComponent, canActivate: [AuthGuard] },
  // { path: 'business', component: BusinessProfileComponent, canActivate: [AuthGuard] },
  // { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
  // { path: 'create-property', component: CreatePropertyComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
