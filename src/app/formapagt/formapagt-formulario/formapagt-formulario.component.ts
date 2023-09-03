import { Component } from '@angular/core';
import { FormapagtService } from '../formapagt.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formapagt-formulario',
  templateUrl: './formapagt-formulario.component.html',
  styleUrls: ['./formapagt-formulario.component.scss']
})
export class FormapagtFormularioComponent {

  public indice: string='';
  public nome: string='';
  public obs: string = '';

  constructor (
    public formapagt_service: FormapagtService,
    public activated_route: ActivatedRoute
  ) {


    this.activated_route.params.subscribe(

      (params: any) => {

        //Caso seja um registro novo interromper o método
        if(params.indice == undefined) return;


        this.formapagt_service.ref().child('/' + params.indice).on('value', (snapshot: any) => {

          let dado: any = snapshot.val();
          this.indice = params.indice;
          this.nome = dado.nome;
          this.obs = dado.obs;
        })
      })

  }


  salvar() {
    if (this.indice == undefined) {
    this.formapagt_service.salvar({
      nome: this.nome,
      obs: this.obs
      })
    
    

    alert("Forma de pagamento cadastrada");

    }

    else {
      this.formapagt_service.editar(this.indice, {nome: this.nome, obs: this.obs})

      alert("Alterações salvas");
    }


    this.nome = "";
    this.obs = "";
  }








}
