import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/categoria/categoria.service';
import { SubcategoriaService } from 'src/app/subcategoria/subcategoria.service';
import { ProdutoService } from '../produto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produto-formulario',
  templateUrl: './produto-formulario.component.html',
  styleUrls: ['./produto-formulario.component.scss']
})
export class ProdutoFormularioComponent {

  public indice: string = "";
  public nome: string = '';
  public preco: string = '';
  public descricao: string = '';
  public categoria: string = '';
  public subcategoria: string = '';

  public categorias: Array<any> = [];
  public subcategorias: Array<any> = [];

  public is_desabilitado: boolean = true;

  constructor(
    public subcategoria_service: SubcategoriaService,
    public categoria_service: CategoriaService,
    public produto_service: ProdutoService,
    public activated_route: ActivatedRoute
  ) {


    this.listarCategoria();

    this.activated_route.params.subscribe(


      (params: any) => {

        if (params.indice == undefined) return;


        this.produto_service.ref().child('/' + params.indice).on('value', (snapshot: any) => {

          let dado: any = snapshot.val();
          this.indice = params.indice;
          this.nome = dado.nome;
          this.preco = dado.preco;
          this.descricao = dado.descricao;
          this.categoria = dado.categoria;
          this.is_desabilitado = false;
          this.listarSubCategoria(dado.categoria),
          this.subcategoria = dado.subcategoria;

          
        })
      }


    )



  }


  salvar() {

    let validacoes_campos = this.validar_campos(); //Valida todos os campos do formulário

    if (this.indice == "") {


      if (validacoes_campos.get("nome_valido") == true &&
        validacoes_campos.get("preco_valido") == true &&
        validacoes_campos.get("descricao_valido") == true &&
        validacoes_campos.get("categoria_valido") == true &&
        validacoes_campos.get("subcategoria_valido") == true) {


        
        console.log(this.categoria);
        console.log(this.categoria_service.get(this.categoria));

        this.produto_service.salvar({
          nome: this.nome,
          preco: this.preco,
          descricao: this.descricao,
          categoria: this.categoria,
          subcategoria: this.subcategoria
        })

        alert("Produto cadastrado");

        this.nome = "",
        this.preco = "",
        this.descricao = '',
        this.categoria = "",
        this.subcategoria = "";

      }


    }

    else {

      if (validacoes_campos.get("nome_valido") == true &&
        validacoes_campos.get("preco_valido") == true &&
        validacoes_campos.get("descricao_valido") == true &&
        validacoes_campos.get("categoria_valido") == true && 
        validacoes_campos.get("subcategoria_valido") == true) {

        this.produto_service.editar(
          this.indice, 
          {nome: this.nome,
          preco: this.preco,
          descricao: this.descricao,
          categoria: this.categoria,
          subcategoria: this.subcategoria})


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

    if (this.preco == "") {
      document.querySelector("#preco")?.classList.add('has-error');
      validacoes.set("preco_valido", false);
    }


    else {
      document.querySelector("#preco")?.classList.remove('has-error');
      validacoes.set("preco_valido", true);

    }

    if (this.descricao == "") {
      document.querySelector("#descricao")?.classList.add('has-error');
      validacoes.set("descricao_valido", false);
    }


    else {
      document.querySelector("#descricao")?.classList.remove('has-error');
      validacoes.set("descricao_valido", true);

    }


    if (this.categoria == "") {
      document.querySelector("#categoria")?.classList.add('has-error');
      validacoes.set("categoria_valido", false);
    }


    else {
      document.querySelector("#categoria")?.classList.remove('has-error');
      validacoes.set("categoria_valido", true);

    }

    if (this.subcategorias.length > 0 && this.subcategoria == "") {
      document.querySelector("#subcategoria")?.classList.add('has-error');
      validacoes.set("subcategoria_valido", false);
    }


    else {
      document.querySelector("#subcategoria")?.classList.remove('has-error');
      validacoes.set("subcategoria_valido", true);

    }

    return validacoes;
  }

  listarCategoria() {

     //Carrega os dados para Categoria
     this.categoria_service.listar()
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
             this.categorias.push({
               descricao: e.descricao,
               indice: Object.keys(snapshot.val())[i]
             });
           })
     });


  }

  listarSubCategoria(_categoria: string) {
    
    //Limpa a lista de subcategorias
    this.subcategorias.splice(0, this.subcategorias.length);

    //Limpa o campo de Subcategoria
    this.subcategoria = "";

    this.subcategoria_service.listar().on('value', (snapshot: any) => {

      //Dados retornados do Firebase
      let response = snapshot.val();

      //Não setar valores caso não venha nenhum registro
      if(response == null) return;
      
      Object.values( response )
      .forEach( (e: any, i: number) => {

        //Indice da subcategoria
        let _indice = Object.keys(snapshot.val())[i];

        //Adiciona os elementos no vetor de dados
        if(_categoria == e.categoria) {
          this.subcategorias.push({
            descricao: e.descricao,
            categoria: e.categoria,
            indice: _indice
          });
        }
      })

      if(this.subcategorias.length > 0) {
        this.is_desabilitado = false;
        document.querySelector("#subcategoria-label")?.classList.add('campo-obrigatorio');

      }

      else {
        this.is_desabilitado = true;
        document.querySelector("#subcategoria-label")?.classList.remove('campo-obrigatorio');
      }

    })
  }

}
