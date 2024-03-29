import { AuthService } from 'src/app/auth.service';
import { Product } from 'src/app/response/product';
import { ProductService } from 'src/app/product.service';
import { Manufacture } from 'src/app/response/manufacture';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ManifestCreateComponent } from '../manifest-create/manifest-create.component';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { LoadingPopupComponent } from 'src/app/partials/loading-popup/loading-popup.component';
import { ProductsEditComponent } from 'src/app/product-and-category/products-edit/products-edit.component';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {

  @Input() attachable: boolean;
  @Input() selectable: boolean;
  @Input() manufacture: Manufacture;
  @Output() selected = new EventEmitter<Product>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public loading: boolean;
  public headers: string[];
  public manufactures: MatTableDataSource<Product>;

  protected admin: boolean;

  constructor(
    private product: ProductService,
    private dialog: MatDialog,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.admin = this.auth.isAdmin();
    this.headers = ['id', 'code', 'name', 'serial_number', 'price', 'stock', 'category', 'attach', 'edit', 'destroy', 'show', 'select'];
    this.buildTable();
  }

  private buildTable() {
    this.product.index().subscribe(response => {
      this.loading = false;
      console.log(response);
      this.manufactures = new MatTableDataSource<Product>(response);
      this.manufactures.paginator = this.paginator;
      this.manufactures.sort = this.sort;
    });
  }

  private rebuildTable() {
    this.loading = true;
    this.product.index().subscribe(response => {
      this.manufactures.data = response;
      this.loading = false;
    });
  }

  public applyFilter(filterValue: string) {
    this.manufactures.filter = filterValue.trim().toLowerCase();
  }

  public attahToManufacture(product: Product) {
    const dialogRef = this.dialog.open(ManifestCreateComponent,
      { width: '300px', data: { product: product, manufacture: this.manufacture }}
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rebuildTable();
      }
    });
  }

  public editProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductsEditComponent, { data: { product: product }, width: '800px' });
    dialogRef.afterClosed().subscribe(() => {
      this.rebuildTable();
    });
  }

  public destroyProduct(product: Product) {
    this.dialog.open(LoadingPopupComponent, { data: 'Destroying Product' });
    this.product.destroy(product).subscribe(() => {
      this.dialog.closeAll();
      this.rebuildTable();
    });
  }

  public selectProduct(product: Product) {
    this.selected.emit(product);
  }

  public refetchTable() {
    this.rebuildTable();
  }
}
