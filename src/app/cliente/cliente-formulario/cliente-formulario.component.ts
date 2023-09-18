import { Component } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente-formulario',
  templateUrl: './cliente-formulario.component.html',
  styleUrls: ['./cliente-formulario.component.scss']
})
export class ClienteFormularioComponent {

  public indice: string = "";
  public nome: string = "";
  public cpf: string = "";
  public dat_nas: string = "";
  public celular: string = "";
  public email: string = "";

  constructor(
    public cliente_service: ClienteService,
    public activated_route: ActivatedRoute
  ) {

    this.activated_route.params.subscribe(

      (params: any) => {

        if (params.indice == undefined) return;

        this.cliente_service.ref().child('/' + params.indice).on("value", (snapshot: any) => {

          let dado: any = snapshot.val();
          this.indice = params.indice;
          this.nome = dado.nome;
          this.cpf = dado.cpf;
          this.dat_nas = dado.dat_nas;
          this.celular = dado.celular;
          this.email = dado.email;

        })

      }
    )

  }

  salvar() {

    let validacoes_campos = this.validar_campos();


    console.log(validacoes_campos.get("nome_valido"))
    console.log(validacoes_campos.get("cpf_valido"))
    console.log(validacoes_campos.get("dat_nas_valido"))
    console.log(validacoes_campos.get("email_valido"))

    if (this.indice == "") {


      if (validacoes_campos.get("nome_valido") == true
          && validacoes_campos.get("cpf_valido") == true
          && validacoes_campos.get("dat_nas_valido") == true
          && validacoes_campos.get("email_valido") == true) {

        this.cliente_service.salvar({
          nome: this.nome,
          cpf: this.cpf,
          dat_nas: this.dat_nas,
          celular: this.celular,
          email: this.email

        })

        alert("Cliente cadastrado");

        this.nome = "";
        this.cpf = "";
        this.dat_nas = "";
        this.celular = "";
        this.email = "";
      }
    }
    else {

     

      if (validacoes_campos.get("nome_valido") == true
          && validacoes_campos.get("cpf_valido") == true
          && validacoes_campos.get("dat_nas_valido") == true
          && validacoes_campos.get("email_valido") == true) {

      this.cliente_service.editar(
        this.indice, 
        {nome: this.nome,
        cpf: this.cpf,
        dat_nas: this.dat_nas,
        celular: this.celular,
        email: this.email}
      
        )

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

    if (this.cpf == "") {
      document.querySelector("#cpf")?.classList.add('has-error');
      validacoes.set("cpf_valido", false);
    }

    else {
      document.querySelector("#cpf")?.classList.remove('has-error');
      validacoes.set("cpf_valido", true);

    }

    if (this.dat_nas == "") {
      document.querySelector("#dat_nas")?.classList.add('has-error');
      validacoes.set("dat_nas_valido", false);
    }

    else {
      document.querySelector("#dat_nas")?.classList.remove('has-error');
      validacoes.set("dat_nas_valido", true);

    }

    if (this.email == "") {
      document.querySelector("#email")?.classList.add('has-error');
      validacoes.set("email_valido", false);
    }

    else {
      document.querySelector("#email")?.classList.remove('has-error');
      validacoes.set("email_valido", true);

    }

    return validacoes;

  }
}
