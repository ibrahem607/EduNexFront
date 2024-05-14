import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { PaymentService } from 'src/app/Services/Payment/payment.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent {
  shippingForm!: FormGroup;
  @Input() paymentType!: string;
  @ViewChild('paymentFrame') paymentFrame!: ElementRef;
  paymentResponse: any;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private studentData: AuthService,
  ) { }

  ngOnInit(): void {
    this.shippingForm = this.fb.group({
      price: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.shippingForm.valid) {
      const paymentData = {
        price: this.shippingForm.value.price,
        userId: this.studentData.getUserId(),
      };

      if (this.paymentType == 'credit') {
        this.paymentService.getIFrameForOnlineCardPayment(paymentData).subscribe(
          (response) => {
            this.shippingForm.reset();
            console.log(response);
            const iframeSrc = response.data;
            this.loadIframe(iframeSrc);
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      } else if (this.paymentType == 'kiosk') {
        this.paymentService.getReferenceNumberForKioskPayment(paymentData).subscribe(
          (response) => {
            this.shippingForm.reset();
            console.log(response);
            this.paymentResponse = response;
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      }
    } else {
      Object.keys(this.shippingForm.controls).forEach(controlName => {
        this.shippingForm.get(controlName)?.markAsTouched();
      });
    }
  }

  loadIframe(src: string): void {
    const iframe: HTMLIFrameElement = this.paymentFrame.nativeElement;
    iframe.src = src;
  }
}
