import { Component } from '@angular/core';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-formulario',
  templateUrl: './categoria-formulario.component.html',
  styleUrls: ['./categoria-formulario.component.scss']
})
export class CategoriaFormularioComponent {

  public descricao:string = '';
  public valor:string = "";

  constructor (
    public categoria_service:CategoriaService
  ){}

  salvar() {

    this.categoria_service.salvar({

      descricao: this.descricao
    })
  }

}
