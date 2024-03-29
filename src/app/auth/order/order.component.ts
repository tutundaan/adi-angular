import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/product';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SelectProductDialogComponent } from 'src/app/Auth/select-product-dialog/select-product-dialog.component';
import { RemoveSelectedProductComponent } from 'src/app/Auth/remove-selected-product/remove-selected-product.component';
import { DiscountDialogComponent } from 'src/app/Auth/discount-dialog/discount-dialog.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public tableHeader: string[];
  public total: number;
  public iterate: number;
  public subTotal: number;
  public discount: number;
  public paymentType: FormControl;
  public productFormGroup: FormGroup;
  public customerFormGroup: FormGroup;
  public products: MatTableDataSource<Product>;
  public selectedProducts: MatTableDataSource<Product>;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.iterate = 1;
    this.tableHeader = ['code', 'name', 'price', 'quantity', 'sum', 'discount', 'id'];
    const products: Product[] = [
      { position: this.iterate++, id: 1, code: 'A1', name: 'Lubricants', price: 45000, quantity: 0, stock: 100, discount: 0 },
      { position: this.iterate++, id: 2, code: 'A2', name: 'Chain Cleaner', price: 25000, quantity: 0, stock: 300, discount: 0 },
      { position: this.iterate++, id: 3, code: 'A3', name: 'Chain Lube', price: 30000, quantity: 0, stock: 150, discount: 0 },
      { position: this.iterate++, id: 4, code: 'A4', name: 'Paint Remover', price: 50000, quantity: 0, stock: 300, discount: 0 },
      { position: this.iterate++, id: 5, code: 'A5', name: 'Catalyst', price: 15000, quantity: 0, stock: 450, discount: 0 }
    ];
    const selectedProducts: Product[] = [];
    this.products = new MatTableDataSource<Product>(products);
    this.selectedProducts = new MatTableDataSource<Product>(selectedProducts);
    this.productFormGroup = this.formBuilder.group({
    });
    this.customerFormGroup = this.formBuilder.group({
      customerName: ['Toko Berkah Abadi', [Validators.required, Validators.maxLength(45), Validators.minLength(6)]],
      customerAddress: ['Jln. Borobudur Raya no. 13 Kelapa Dua Kabupaten Tangerang', [Validators.required, Validators.maxLength(255)]],
      customerPhone: ['0823 1987 8833', [Validators.required, Validators.maxLength(14), Validators.minLength(8)]],
      customerPayment: ['1',  Validators.required ],
      customerDiscount: [false,  Validators.required ],
      customerDiscountPercent: [0]
    });
  }

  public sumTotal() {
    this.total = 0;
    this.subTotal = 0;
    this.discount = 0;
    this.selectedProducts.data.forEach((data) => {
      this.subTotal += data.price * data.quantity;
    });
    if (this.customerFormGroup.value.customerDiscount) {
      this.discount = (this.customerFormGroup.value.customerDiscountPercent * this.subTotal) / 100;
    } else {
      this.discount = 0;
    }
    this.total = this.subTotal - this.discount;
  }

  public openProductDialog() {
    const dialog = this.dialog.open(SelectProductDialogComponent, { width: '800px',
      data: {
        products: this.products,
        selectedProducts: this.selectedProducts
      }}
    );
    dialog.afterClosed().subscribe(result => {
      const selected = this.selectedProducts.data;
      this.selectedProducts.data = selected;
      this.sumTotal();
    });
  }

  public showRemoveDialog(id: number) {
    const product = this.selectedProducts.data.find((item) => item.id === id);
    const products = this.products.data;
    const selected = this.selectedProducts.data;
    const dialog = this.dialog.open(RemoveSelectedProductComponent,
      { data: product }
    );

    dialog.afterClosed().subscribe(result => {
      if (product.quantity === result) {
        this.selectedProducts.data.map((current, index) => {
          if (current.id === product.id) {
            selected.splice(index, 1);
            products.find((item => item.id === current.id)).stock += current.quantity;
          }
        });
      } else {
        product.quantity -= result;
        products.find((item => item.id === product.id)).stock += product.quantity;
      }
      this.selectedProducts.data = selected;
      this.products.data = products;
    });
  }

  public discountDialog(id: number) {
    const data = this.selectedProducts.data;
    data.map( product => {
      if (product.id === id) {
        const dialog = this.dialog.open(DiscountDialogComponent, { data: product });
        dialog.afterClosed().subscribe((result) => product.discount = result);
      }
    });
    this.selectedProducts.data = data;
  }
}
