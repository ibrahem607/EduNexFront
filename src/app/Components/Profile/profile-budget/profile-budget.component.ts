import { Component } from "@angular/core";

export interface PeriodicElement {
  materialName: string;
  price: number;
  purchaseDate: string;
  priceBefore: number;
  priceAfter: number;
  addedBy: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { materialName: 'الرياضيات', price: 100, purchaseDate: '2024-04-15 06:47:10', priceBefore: 120, priceAfter: 100, addedBy: 'محمد' },
  { materialName: 'الفيزياء', price: 120, purchaseDate: '2024-04-15 06:47:10', priceBefore: 150, priceAfter: 120, addedBy: 'أحمد' },
  { materialName: 'الكيمياء', price: 150, purchaseDate: '2024-04-15 06:47:10', priceBefore: 180, priceAfter: 150, addedBy: 'سارة' },
  { materialName: 'علم الأحياء', price: 200, purchaseDate: '2024-04-15 06:47:10', priceBefore: 220, priceAfter: 200, addedBy: 'أمير' }
];

@Component({
  selector: 'app-profile-budget',
  templateUrl: './profile-budget.component.html',
  styleUrls: ['./profile-budget.component.css']
})

export class ProfileBudgetComponent {
  displayedColumns: string[] = ['MaterialName', 'Price', 'PurchaseDate', 'PriceBefore', 'PriceAfter', 'AddedBy'];
  dataSource = ELEMENT_DATA;
}
