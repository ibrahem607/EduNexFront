import { Component, OnInit } from "@angular/core";
import { ITransaction } from "src/app/Model/itransaction";
import { AuthService } from "src/app/Services/Auth/auth.service";
import { PaymentService } from "src/app/Services/Payment/payment.service";

@Component({
  selector: 'app-profile-budget',
  templateUrl: './profile-budget.component.html',
  styleUrls: ['./profile-budget.component.css']
})

export class ProfileBudgetComponent implements OnInit {
  transactions: ITransaction[] = [];
  displayedColumns: string[] = ['TransactionType', 'Amount', 'TransactionDate'];

  constructor(private authService: AuthService, private paymentService: PaymentService) { }

  ngOnInit() {
    this.getStudentTransactions();
  }

  getStudentTransactions() {
    const userId = this.authService.getUserId();
    this.paymentService.getStudentTransactions(userId)
      .subscribe(transaction => {
        this.transactions = [transaction].flat();
        // console.log(this.transactions)
      });
  }
}
