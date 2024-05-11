import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { PaymentService } from 'src/app/Services/Payment/payment.service';

@Component({
  selector: 'app-student-settings',
  templateUrl: './student-settings.component.html',
  styleUrls: ['./student-settings.component.css']
})
export class StudentSettingsComponent implements OnInit {
  isInputFocused: boolean = false;
  signupForm!: FormGroup;
  balance!: number;

  constructor(private studentData: AuthService, private paymentData: PaymentService) { }

  ngOnInit(): void {
    this.getWalletBalance();
  }

  getWalletBalance() {
    this.paymentData.getWalletBalance(this.studentData.getUserId())
      .subscribe(balance => {
        this.balance = balance;
      });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      this.signupForm.markAllAsTouched();

    }
  }
}
