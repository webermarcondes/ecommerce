import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstadoService } from 'src/app/estado/estado.service';
import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-fornecedor-formulario',
  templateUrl: './fornecedor-formulario.component.html',
  styleUrls: ['./fornecedor-formulario.component.scss']
})
export class FornecedorFormularioComponent {

  public indice: string = "";
  public nome_fantasia: string = "";
  public razao_social: string = "";
  public cnpj: string = "";
  public contato: string = "";
  public email: string = "";
  public logradouro: string = "";
  public complemento: string = "";
  public bairro: string = "";
  public cidade: string = "";
  public estado: string = "";

  public estados: Array<any> = [];
  constructor(
    public estado_service: EstadoService,
    public fornecedor_service: FornecedorService,
    public activated_route: ActivatedRoute
  ) {


    this.listarEstado();

    this.activated_route.params.subscribe(


      (params: any) => {

        if (params.indice == undefined) return;


        this.fornecedor_service.ref().child('/' + params.indice).on('value', (snapshot: any) => {

          let dado: any = snapshot.val();

          this.indice = params.indice;
          this.nome_fantasia = dado.nome_fantasia;
          this.razao_social = dado.razao_social;
          this.cnpj = dado.cnpj;
          this.contato = dado.contato;
          this.email = dado.email;
          this.logradouro = dado.logradouro;
          this.complemento = dado.complemento;
          this.bairro = dado.bairro;
          this.cidade = dado.cidade;
          this.estado = dado.estado;

        })
      }


    )



  }

  salvar() {

    let validacoes_campos = this.validar_campos();

    /*

        
      nome_fantasia_valido  
      cnpj_valido
      email_valido
      logradouro_valido
      bairro_valido
      cidade_valido
      estado_valido
      */

    if (this.indice == "") {

      if (validacoes_campos.get("nome_fantasia_valido") == true
        && validacoes_campos.get("cnpj_valido") == true
        && validacoes_campos.get("email_valido") == true
        && validacoes_campos.get("logradouro_valido") == true
        && validacoes_campos.get("bairro_valido") == true
        && validacoes_campos.get("cidade_valido") == true
        && validacoes_campos.get("estado_valido") == true
      ) {
        this.fornecedor_service.salvar({

          nome_fantasia: this.nome_fantasia,
          razao_social: this.razao_social,
          cnpj: this.cnpj,
          contato: this.contato,
          email: this.email,
          logradouro: this.logradouro,
          complemento: this.complemento,
          bairro: this.bairro,
          cidade: this.cidade,
          estado: this.estado
        })


        alert("Fornecedor cadastrado");

        this.nome_fantasia = "";
        this.razao_social = "";
        this.cnpj = "";
        this.contato = "";
        this.email = "";
        this.logradouro = "";
        this.complemento = "";
        this.bairro = "";
        this.cidade = "";
        this.estado = "";
      }
    }


    else {



      if (validacoes_campos.get("nome_fantasia_valido") == true
        && validacoes_campos.get("cnpj_valido") == true
        && validacoes_campos.get("email_valido") == true
        && validacoes_campos.get("logradouro_valido") == true
        && validacoes_campos.get("bairro_valido") == true
        && validacoes_campos.get("cidade_valido") == true
        && validacoes_campos.get("estado_valido") == true
      ) {
        
        this.fornecedor_service.editar(this.indice,
          {
            nome_fantasia: this.nome_fantasia,
            razao_social: this.razao_social,
            cnpj: this.cnpj,
            contato: this.contato,
            email: this.email,
            logradouro: this.logradouro,
            complemento: this.complemento,
            bairro: this.bairro,
            cidade: this.cidade,
            estado: this.estado
          })


        alert("Alterações salvas");

      }
    }
  }

  validar_campos() {

    let validacoes = new Map();




    if (this.nome_fantasia == "") {
      document.querySelector("#nome_fantasia")?.classList.add('has-error');
      validacoes.set("nome_fantasia_valido", false);
    }

    else {
      document.querySelector("#nome_fantasia")?.classList.remove('has-error');
      validacoes.set("nome_fantasia_valido", true);
    }


    if (this.cnpj == "") {
      document.querySelector("#cnpj")?.classList.add('has-error');
      validacoes.set("cnpj_valido", false);
    }

    else {
      document.querySelector("#cnpj")?.classList.remove('has-error');
      validacoes.set("cnpj_valido", true);
    }


    if (this.email == "") {
      document.querySelector("#email")?.classList.add('has-error');
      validacoes.set("email_valido", false);
    }

    else {
      document.querySelector("#email")?.classList.remove('has-error');
      validacoes.set("email_valido", true);
    }

    if (this.logradouro == "") {
      document.querySelector("#logradouro")?.classList.add('has-error');
      validacoes.set("logradouro_valido", false);
    }

    else {
      document.querySelector("#logradouro")?.classList.remove('has-error');
      validacoes.set("logradouro_valido", true);
    }

    if (this.bairro == "") {
      document.querySelector("#bairro")?.classList.add('has-error');
      validacoes.set("bairro_valido", false);
    }

    else {
      document.querySelector("#bairro")?.classList.remove('has-error');
      validacoes.set("bairro_valido", true);
    }

    if (this.cidade == "") {
      document.querySelector("#cidade")?.classList.add('has-error');
      validacoes.set("cidade_valido", false);
    }

    else {
      document.querySelector("#cidade")?.classList.remove('has-error');
      validacoes.set("cidade_valido", true);
    }

    if (this.estado == "") {
      document.querySelector("#estado")?.classList.add('has-error');
      validacoes.set("estado_valido", false);
    }

    else {
      document.querySelector("#estado")?.classList.remove('has-error');
      validacoes.set("estado_valido", true);
    }

    return validacoes;

  }

  listarEstado() {


    //Carrega os dados para Estado
    this.estado_service.listar()
      .once('value', (snapshot: any) => {

        // Dados retornados do Firebase
        let response = snapshot.val();

        // Não setar valores caso não venha
        // nenhum registro
        if (response == null) return;

        Object.values(response)
          .forEach(
            (e: any, i: number) => {
              // Adiciona os elementos no vetor
              // de dados
              this.estados.push({
                nome: e.nome,
                indice: Object.keys(snapshot.val())[i]
              });
            })
      });
  }




}
