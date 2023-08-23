import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaFormularioComponent } from './categoria-formulario.component';

describe('CategoriaFormularioComponent', () => {
  let component: CategoriaFormularioComponent;
  let fixture: ComponentFixture<CategoriaFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriaFormularioComponent]
    });
    fixture = TestBed.createComponent(CategoriaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
