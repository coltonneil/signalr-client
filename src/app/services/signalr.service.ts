import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  connection: signalR.HubConnection;
  connectionSuccessful: EventEmitter<void>;
  connectionStatus: EventEmitter<string>;
  paymentRequest: EventEmitter<string>;
  paymentStatus: EventEmitter<void>;
  agentConnectionId = '';

  constructor() {
    this.connectionStatus = new EventEmitter<string>();
    this.connectionSuccessful = new EventEmitter<void>();
    this.paymentRequest = new EventEmitter<string>();
    this.paymentStatus = new EventEmitter<void>();
  }

  private createConnection(): void {
    this.connectionStatus.emit('connecting');
    this.connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.None)
      .withUrl(`http://localhost:5000/messages`)
      .build();
  }

  public connect(): void {
    this.createConnection();
    this.connection
      .start()
      .then(() => {
        this.connectionSuccessful.emit();
        this.connection.on(`RecievePaymentRequest`, (payload: string) => {
          const amount = payload.split('|')[0];
          this.agentConnectionId = payload.split('|')[1];
          this.paymentRequest.emit(amount);
        });
        this.connection.on(`RecievePaymentStatus`, () => {
          this.paymentStatus.emit();
          this.connectionStatus.emit('Payment successful');
        });

      })
      .catch(err => {
        return console.error(err.toString());
      });
  }

  public joinGroup(groupName: string): void {
    this.connection.invoke(`JoinGroup`, groupName).then(() => {
      this.connectionStatus.emit('waiting for agent');
    });
  }

  public sendCardData(cardData): void {
    this.connectionStatus.emit('sending payment information');
    this.connection.invoke(`SendCardData`, this.agentConnectionId, cardData).then(() => {
      this.connectionStatus.emit('payment information sent');
    });
  }

}
