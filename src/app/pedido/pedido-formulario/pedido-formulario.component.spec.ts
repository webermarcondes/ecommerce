import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoFormularioComponent } from './pedido-formulario.component';

describe('PedidoFormularioComponent', () => {
  let component: PedidoFormularioComponent;
  let fixture: ComponentFixture<PedidoFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidoFormularioComponent]
    });
    fixture = TestBed.createComponent(PedidoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
