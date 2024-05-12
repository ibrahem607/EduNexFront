import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { PaymentService } from 'src/app/Services/Payment/payment.service';

@Component({
  selector: 'app-student-shipping-codes',
  templateUrl: './student-shipping-codes.component.html',
  styleUrls: ['./student-shipping-codes.component.css']
})
export class StudentShippingCodesComponent implements OnInit {
  shippingForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private paymentData: PaymentService,
    private studentData: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.shippingForm = this.fb.group({
      code: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.shippingForm.valid) {
      const couponData = {
        couponCode: this.shippingForm.value.code,
        ownerId: this.studentData.getUserId(),
        ownerType: 1
      };
console.log(couponData)
      this.paymentData.consumeCoupon(couponData).subscribe(
        (response) => {
          this.openSnackBar('تم استخدام الكوبون بنجاح', 'snackbar-success');
          this.shippingForm.reset();
        },
        (error) => {
          console.error('Error:', error);
          this.openSnackBar('الكوبون غير صالح', 'snackbar-error');
        }
      );
    }
  }

  openSnackBar(message: string, panelClass: string) {
    this.snackBar.open(message, 'حسناَ', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: panelClass
    });
  }
}
