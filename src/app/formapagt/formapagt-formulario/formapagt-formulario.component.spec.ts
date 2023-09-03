import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormapagtFormularioComponent } from './formapagt-formulario.component';

describe('FormapagtFormularioComponent', () => {
  let component: FormapagtFormularioComponent;
  let fixture: ComponentFixture<FormapagtFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormapagtFormularioComponent]
    });
    fixture = TestBed.createComponent(FormapagtFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
