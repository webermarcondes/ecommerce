import { Component } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categoria-formulario',
  templateUrl: './categoria-formulario.component.html',
  styleUrls: ['./categoria-formulario.component.scss']
})
export class CategoriaFormularioComponent {

  public indice: string = '';
  public descricao:string = '';
  public valor:string = '';

  constructor (
    public categoria_service:CategoriaService,
    public activated_route:ActivatedRoute
  ){

    this.activated_route.params.subscribe(
      
      (params: any) => {

        //Caso seja um registro novo interromper o método
        if(params.indice == undefined) return;

        this.categoria_service.
        ref().child('/' + params.indice).on('value', (snapshot: any) => {

          let dado:any = snapshot.val();
          this.indice = params.indice;
          this.descricao = dado.descricao;
          this.valor = dado.valor;
        })
      })

  }

  salvar() {

    if(this.indice == undefined) {
      this.categoria_service.salvar({

      descricao: this.descricao,
      valor: this.valor
      })

    alert("Produto cadastrado")
    }

    else {

      this.categoria_service.editar(this.indice, {descricao: this.descricao, valor: this.valor})

      alert("Alterações salvas")
    }

  this.descricao = "";
  this.valor = "";

}

}
