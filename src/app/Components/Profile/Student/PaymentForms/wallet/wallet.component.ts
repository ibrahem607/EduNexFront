import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { PaymentService } from 'src/app/Services/Payment/payment.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  @ViewChild('paymentFrame') paymentFrame!: ElementRef;
  shippingForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private studentData: AuthService,
  ) { }

  ngOnInit(): void {
    this.shippingForm = this.fb.group({
      price: ['', Validators.required],
      walletMobileNumber: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.shippingForm.valid) {
      const paymentData = {
        price: this.shippingForm.value.price,
        userId: this.studentData.getUserId(),
        walletMobileNumber: this.shippingForm.value.walletMobileNumber,
      };

      this.paymentService.getURLForMobileWalletPayment(paymentData).subscribe(
        (response) => {
          this.shippingForm.reset();
          console.log(response)
          const iframeSrc = response.data;
          this.loadIframe(iframeSrc);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
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
