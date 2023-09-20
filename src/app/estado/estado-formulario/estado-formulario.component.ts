import { Component } from '@angular/core';
import { EstadoService } from '../estado.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estado-formulario',
  templateUrl: './estado-formulario.component.html',
  styleUrls: ['./estado-formulario.component.scss']
})
export class EstadoFormularioComponent {

  public indice: string = "";
  public nome: string = "";

  constructor(
    public estado_service: EstadoService,
    public activated_route: ActivatedRoute
  ) {

    this.activated_route.params.subscribe(

      (params: any) => {

        //Caso seja um registro novo interromper o método
        if (params.indice == undefined) return;

        this.estado_service.
          ref().child('/' + params.indice).on('value', (snapshot: any) => {

            let dado: any = snapshot.val();
            this.indice = params.indice;
            this.nome = dado.nome;

          })
      })

  }

  salvar() {

    let validacoes_campos = this.validar_campos();
    if (this.indice == "") {


      if (validacoes_campos.get("nome_valido") == true) {
        this.estado_service.salvar({
          nome: this.nome
        })

        alert("Estado cadastrado");

        this.nome = "";
      }

    }

    else {


      
      if (validacoes_campos.get("nome_valido") == true) {
        this.estado_service.editar(this.indice, {
          nome: this.nome
        })

        alert("Alterações salvas");

        
      }


    }

  }

  validar_campos() {

    let validacoes = new Map();

    if (this.nome == "") {
      document.querySelector("#nome")?.classList.add('has-error');
      validacoes.set("nome_valido", false);
    }

    else {
      document.querySelector("#nome")?.classList.remove('has-error');
      validacoes.set("nome_valido", true);

    }

    return validacoes;

  }



}



