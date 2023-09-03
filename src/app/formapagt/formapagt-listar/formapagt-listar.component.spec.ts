import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormapagtListarComponent } from './formapagt-listar.component';

describe('FormapagtListarComponent', () => {
  let component: FormapagtListarComponent;
  let fixture: ComponentFixture<FormapagtListarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormapagtListarComponent]
    });
    fixture = TestBed.createComponent(FormapagtListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
