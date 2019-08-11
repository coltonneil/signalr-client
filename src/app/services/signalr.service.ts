import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  connection: signalR.HubConnection;
  connectionSuccessful: EventEmitter<void>;
  constructor() {
    this.createConnection();
    this.connectionSuccessful = new EventEmitter<void>();
  }

  private createConnection(): void {
    console.log('creating connection');
    this.connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.None)
      .withUrl(`http://localhost:5000/messages`)
      .build();
  }

  public connect(): void {
    this.connection
      .start()
      .then(() => {
        this.connectionSuccessful.emit();
        this.connection.on(`ReceiveMessage`, (payload: string) => {
          console.log(`message recieved: ${payload}`);
        });
        this.connection.on(`UserConnected`, (connectionId: string) => {
          console.log(`connected: ${connectionId}`);
        });
      })
      .catch(err => {
        return console.error(err.toString());
      });
  }

  public joinGroup(groupName: string): void {
    this.connection.invoke(`JoinGroup`, groupName).then(() => {
      console.log(`created group: ${groupName}`);
    });
  }

  public sendMessage(groupName: string, message: string): void {
    this.connection.invoke(`SendMessageToGroup`, groupName, message).then(() => {
      console.log(`sent ${message} to group ${groupName}`);
    });
  }
}
