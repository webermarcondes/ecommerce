import { Component } from '@angular/core';
import { SubcategoriaService } from '../subcategoria.service';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/categoria/categoria.service';

@Component({
  selector: 'app-subcategoria-formulario',
  templateUrl: './subcategoria-formulario.component.html',
  styleUrls: ['./subcategoria-formulario.component.scss']
})
export class SubcategoriaFormularioComponent {
  public descricao: string='';
  public indice: string='';
  public categoria:string = '';
  public categorias:Array<any> = [];

  constructor(
    public subcategoria_service: SubcategoriaService,
    public categoria_service: CategoriaService,
    public activated_route: ActivatedRoute
  ) {

    //Carregamento das categorias
    this.categoria_service.listar()
    .once('value',(snapshot:any) => {

      // Dados retornados do Firebase
      let response = snapshot.val();

      // Não setar valores caso não venha
      // nenhum registro
      if (response == null) return;

      Object.values( response )
      .forEach(
        (e:any,i:number) => {
          // Adiciona os elementos no vetor
          // de dados
          this.categorias.push({
            descricao: e.descricao,
            indice: Object.keys(snapshot.val())[i]
          });          
      })
    })  ;

    //Carregamento dos dados quando o usuário deseja editar algum registro
    this.activated_route.params.subscribe(


      (params: any) => {

        if(params.indice == undefined) return;


        this.subcategoria_service.ref().child('/' + params.indice).on('value', (snapshot: any) => {

          let dado: any = snapshot.val();
          this.indice = params.indice;
          this.descricao = dado.descricao;
          this.categoria = dado.categoria;
        })
      }


    )

    
  }

  salvar() {

    let validacoes_campos = this.validar_campos(); //Valida todos os campos do formulário

    if(this.indice == "") {

      
      if(validacoes_campos.get("descricao_valido") == true) {
        this.subcategoria_service.salvar({
          descricao: this.descricao,
          categoria: this.categoria
        })

        alert("Sub-categoria cadastrada");

        this.descricao = '';
        this.categoria = "";
      }

      
  }

  else {

    if(validacoes_campos.get("descricao_valido") == true && validacoes_campos.get("categoria_valido") == true) {
      this.subcategoria_service.editar(this.indice, {descricao: this.descricao})
      alert("Alterações salvas");
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

    if(this.categoria == "") {
      document.querySelector("#categoria")?.classList.add('has-error');
      validacoes.set("categoria_valido", false);
    }


    else {
      document.querySelector("#categoria")?.classList.remove('has-error');
      validacoes.set("categoria_valido", true);

    }

    return validacoes;
  }
  }

