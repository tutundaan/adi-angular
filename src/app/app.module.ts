import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { LoginModule } from './login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { PartialsModule } from './partials/partials.module';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { WarehouseModule } from './warehouse/warehouse.module';
import { MatProgressButtonsModule } from 'mat-progress-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductAndCategoryModule } from './product-and-category/product-and-category.module';
import { AdminModule } from './admin/admin.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { GuestModule } from './guest/guest.module';
import { ManagerModule } from './manager/manager.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
    HttpClientModule,
    MatProgressButtonsModule.forRoot(),
    AuthModule,
    StorageServiceModule,
    PartialsModule,
    WarehouseModule,
    ProductAndCategoryModule,
    AdminModule,
    MDBBootstrapModule.forRoot(),
    GuestModule,
    ManagerModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
