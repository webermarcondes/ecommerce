import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/cliente/cliente.service';
import { ProdutoService } from 'src/app/produto/produto.service';
import { PedidoService } from '../pedido.service';
import { FormapagtService } from 'src/app/formapagt/formapagt.service';

@Component({
  selector: 'app-pedido-formulario',
  templateUrl: './pedido-formulario.component.html',
  styleUrls: ['./pedido-formulario.component.scss']
})
export class PedidoFormularioComponent {

  /*
    descricao,
    cliente -> clientes,
    produto -> produtos,
    quantidade,
    fpag -> fspag
  */

  public clientes: Array<any> = [];
  public produtos: Array<any> = [];
  public formaspag: Array<any> = [];

  public indice: string = "";
  public descricao: string = "";
  public cliente: string = "";
  public produto: string = "";
  public fpag: string = "";
  public quantidade: string = "";
  public valor: string = "";

  constructor(
    public cliente_service: ClienteService,
    public produto_service: ProdutoService,
    public pagamento_service: FormapagtService,
    public pedido_service: PedidoService,
    public activated_route: ActivatedRoute
  ) {

    //Carrega os dados para Cliente
    this.cliente_service.listar()
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
              this.clientes.push({
                nome: e.nome,
                indice: Object.keys(snapshot.val())[i]
              });
            })
      });


    //Carrega os dados para Produto
    this.produto_service.listar()
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
              this.produtos.push({
                nome: e.nome,
                indice: Object.keys(snapshot.val())[i]
              });
            })
      });

    //Carrega os dados para Forma de pagamento
    this.pagamento_service.listar()
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
              this.formaspag.push({
                nome: e.nome,
                indice: Object.keys(snapshot.val())[i]
              });
            })
      });

    this.activated_route.params.subscribe(

      (params: any) => {

        if (params.indice == undefined) return;

        this.pedido_service.ref().child('/' + params.indice).on('value', (snapshot: any) => {

          let dado: any = snapshot.val();

          this.indice = params.indice;
          this.descricao = dado.descricao;
          this.cliente = dado.cliente;
          this.produto = dado.produto;
          this.fpag = dado.fpag;

        })
      }

    )

  }


  salvar() {

    let validacoes_campos = this.validar_campos();
    if (this.indice == "") {


      if (validacoes_campos.get("descricao_valido") == true
        && validacoes_campos.get("cliente_valido") == true
        && validacoes_campos.get("produto_valido") == true
        && validacoes_campos.get("fpag_valido") == true) {

        this.pedido_service.salvar({

          descricao: this.descricao,
          cliente: this.cliente,
          produto: this.produto,
          fpag: this.fpag
        })

        alert("Pedido cadastrado");

        this.descricao = "";
        this.cliente = "";
        this.produto = "";
        this.fpag = "";

      }
    }

    else {


      if (validacoes_campos.get("descricao_valido") == true
        && validacoes_campos.get("cliente_valido") == true
        && validacoes_campos.get("produto_valido") == true
        && validacoes_campos.get("fpag_valido") == true) {

        
          this.pedido_service.editar(this.indice, 
            {descricao: this.descricao,
            cliente: this.cliente,
            produto: this.produto,
            fpag: this.fpag
          })
  
          alert("Alterações salvas");
      }   

    }
  }


  validar_campos() {

    let validacoes = new Map();

    if (this.descricao == "") {
      document.querySelector("#descricao")?.classList.add('has-error');
      validacoes.set("descricao_valido", false);
    }

    else {
      document.querySelector("#descricao")?.classList.remove('has-error');
      validacoes.set("descricao_valido", true);
    }


    if (this.cliente == "") {
      document.querySelector("#cliente")?.classList.add('has-error');
      validacoes.set("cliente_valido", false);
    }

    else {
      document.querySelector("#cliente")?.classList.remove('has-error');
      validacoes.set("cliente_valido", true);
    }


    if (this.produto == "") {
      document.querySelector("#produto")?.classList.add('has-error');
      validacoes.set("produto_valido", false);
    }

    else {
      document.querySelector("#produto")?.classList.remove('has-error');
      validacoes.set("produto_valido", true);
    }

    if (this.fpag == "") {
      document.querySelector("#fpag")?.classList.add('has-error');
      validacoes.set("fpag_valido", false);
    }

    else {
      document.querySelector("#fpag")?.classList.remove('has-error');
      validacoes.set("fpag_valido", true);
    }


    return validacoes;



  }
}
