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
         
        })
      })

  }

  salvar() {

    let validacoes_campos = this.validar_campos(); //Valida todos os campos do formulário

    if(this.indice == '') {
   
      
      if(validacoes_campos.get("descricao_valido") == true) {

        this.categoria_service.salvar({

        descricao: this.descricao,
       
        })

        alert("Categoria cadastrado")

        this.descricao = '';
        

      }
    }

    else {


      if(validacoes_campos.get("descricao_valido") == true) {

        this.categoria_service.editar(this.indice, {descricao: this.descricao})

        alert("Alterações salvas")
      }
    }
  }

  validar_campos() {

    let validacoes = new Map();

    if(this.descricao == "") {
      document.querySelector("#descricao")?.classList.add('has-error');
      validacoes.set("descricao_valido", false);
    }

    else {
      document.querySelector("#descricao")?.classList.remove('has-error');
      validacoes.set("descricao_valido", true);

    }
    
    return validacoes;
  }
  
}
