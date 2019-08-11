import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignalrService } from '../services/signalr.service';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-signalr-client',
  templateUrl: './signalr-client.component.html',
  styleUrls: ['./signalr-client.component.scss']
})
export class SignalrClientComponent implements OnInit {

  messageControl = new FormControl('');
  groupId: string;

  constructor(
    private route: ActivatedRoute,
    private signalrService: SignalrService) { }

  ngOnInit() {
    this.signalrService.connect();
    this.groupId = this.route.snapshot.paramMap.get('groupId');
    this.signalrService.connectionSuccessful.subscribe(() => {
      this.joinGroup();
  });

  }
  joinGroup(): void {
    console.log('joining group');
    this.signalrService.joinGroup(this.groupId);
  }

  sendMessage(): void {
    this.signalrService.sendMessage(this.groupId, this.messageControl.value);
  }
}
