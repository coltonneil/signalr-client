import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignalrClientComponent } from './signalr-client/signalr-client.component';

const routes: Routes = [{ path: ':groupId', component: SignalrClientComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
