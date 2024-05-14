import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { PaymentService } from 'src/app/Services/Payment/payment.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  shippingForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private paymentData: PaymentService,
    private studentData: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
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

      this.paymentData.consumeCoupon(couponData).subscribe(
        () => {
          this.openSnackBar('تم استخدام الكوبون بنجاح', 'snackbar-success');
          this.shippingForm.reset();
          this.reloadCurrentRoute();
        },
        (error) => {
          console.error('Error:', error);
          this.openSnackBar('الكوبون غير صالح', 'snackbar-error');
        }
      );
    } else {
      Object.keys(this.shippingForm.controls).forEach(controlName => {
        this.shippingForm.get(controlName)?.markAsTouched();
      });
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

  reloadCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
