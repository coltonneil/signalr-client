import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignalrService } from '../services/signalr.service';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signalr-client',
  templateUrl: './signalr-client.component.html',
  styleUrls: ['./signalr-client.component.scss']
})
export class SignalrClientComponent implements OnInit {
  groupId: string;
  status = '';
  showPaymentForm = false;
  amount = 0;
  cardNumber: string;
  expirationDate: string;
  paymentComplete = false;

  constructor(
    private route: ActivatedRoute,
    private signalrService: SignalrService
  ) {
  }

  ngOnInit() {
    this.signalrService.connectionStatus.subscribe(status => {
      this.status = status;
      if (this.status === 'prompted for payment') {
        this.showPaymentForm = true;
      }
    });
    this.signalrService.connectionSuccessful.subscribe(() => {
      this.joinGroup();
    });
    this.signalrService.paymentRequest.subscribe((amount) => {
      this.amount = amount;
      this.showPaymentForm = true;
    });
    this.signalrService.paymentStatus.subscribe(() => {
      this.paymentComplete = true;
    });

    this.groupId = this.route.snapshot.paramMap.get('groupId');
    this.signalrService.connect();
  }

  joinGroup(): void {
    this.signalrService.joinGroup(this.groupId);
  }

  onSubmit(): void {
    this.sendCardData(btoa(this.cardNumber + this.expirationDate));
  }
  sendCardData(cardData: string): void {
    this.signalrService.sendCardData(cardData);
    this.showPaymentForm = false;
    this.status = 'Payment information sent';
  }
}
