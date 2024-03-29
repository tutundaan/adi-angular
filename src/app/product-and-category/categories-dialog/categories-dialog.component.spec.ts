import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesDialogComponent } from './categories-dialog.component';

describe('CategoriesCreateDialogComponent', () => {
  let component: CategoriesDialogComponent;
  let fixture: ComponentFixture<CategoriesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
