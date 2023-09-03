import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormapagtComponent } from './formapagt.component';

describe('FormapagtComponent', () => {
  let component: FormapagtComponent;
  let fixture: ComponentFixture<FormapagtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormapagtComponent]
    });
    fixture = TestBed.createComponent(FormapagtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
