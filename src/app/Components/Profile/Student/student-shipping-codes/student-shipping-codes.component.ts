import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { PaymentService } from 'src/app/Services/Payment/payment.service';

@Component({
  selector: 'app-student-shipping-codes',
  templateUrl: './student-shipping-codes.component.html',
  styleUrls: ['./student-shipping-codes.component.css']
})
export class StudentShippingCodesComponent implements OnInit {
  balance!: number;
  selectedOptionIndex: number = 0;
  paymentType!: string;

  options = [
    { label: 'كرت شحن', selected: true },
    { label: 'محفظه الكترونية', selected: false },
    { label: 'كشك', selected: false },
    { label: 'بطاقة بنكية', selected: false },
  ];

  constructor(
    private paymentData: PaymentService,
    private studentData: AuthService,
  ) { }

  ngOnInit(): void {
    this.getWalletBalance();
  }

  getWalletBalance() {
    this.paymentData.getWalletBalance(this.studentData.getUserId())
      .subscribe(balance => {
        this.balance = balance;
      });
  }

  setActiveSection(index: number): void {
    if (index == 2) {
      this.paymentType = 'kiosk';
    } else if (index == 3) {
      this.paymentType = 'credit';
    } else {
      this.paymentType = '';
    }

    this.options.forEach((option, i) => {
      option.selected = i === index;
    });
    this.selectedOptionIndex = index;
  }
}
