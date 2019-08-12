import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignalrClientComponent } from './signalr-client/signalr-client.component';
import { ConnectionFinderComponent } from './connection-finder/connection-finder.component';

const routes: Routes = [
  { path: '', component: ConnectionFinderComponent},
  { path: ':groupId', component: SignalrClientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
