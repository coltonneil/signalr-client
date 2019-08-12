import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignalrClientComponent } from './signalr-client/signalr-client.component';
import { FormsModule } from '@angular/forms';
import { ConnectionFinderComponent } from './connection-finder/connection-finder.component';

@NgModule({
  declarations: [
    AppComponent,
    SignalrClientComponent,
    ConnectionFinderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
