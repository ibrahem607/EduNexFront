import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-shipping-codes',
  templateUrl: './student-shipping-codes.component.html',
  styleUrls: ['./student-shipping-codes.component.css']
})
export class StudentShippingCodesComponent implements OnInit {
  shippingForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.shippingForm = this.fb.group({
      code: ['', Validators.required]
    });
  }
}
