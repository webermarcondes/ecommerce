import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoService } from '../produto.service';
import { CategoriaService } from 'src/app/categoria/categoria.service';
import { SubcategoriaService } from 'src/app/subcategoria/subcategoria.service';

@Component({
  selector: 'app-produto-listar',
  templateUrl: './produto-listar.component.html',
  styleUrls: ['./produto-listar.component.scss']
})
export class ProdutoListarComponent implements OnInit{

  public dados: Array<any> = [];

  constructor(
    public produto_service: ProdutoService,
    public categoria_service: CategoriaService,
    public subcategoria_service: SubcategoriaService,
    public router: Router
  ) {}


  ngOnInit(): void{
    this.produto_service.listar()
    .on('value', (snapshot: any) => {

      //Limpa a váriavel local com os dados
      this.dados.splice(0, this.dados.length);

      //Dados retornados do Firebase
      let response = snapshot.val();

      //Não setar valores caso não venha nenhum registro
      if(response==null) return;

      Object.values(response).forEach(async (e: any, i: number) => {

        let categoria_descricao: any = await this.categoria_service.get(e.categoria);

        
        let subcategoria_descricao: any = "";
        if(e.subcategoria != "") {
          subcategoria_descricao = await this.subcategoria_service.get(e.subcategoria);
        }  
       
        this.dados.push({
          nome: e.nome,
          preco: e.preco,
          descricao: e.descricao,
          categoria: categoria_descricao.descricao,
          subcategoria: subcategoria_descricao.descricao,
          indice: Object.keys(snapshot.val())[i]
        })
      
      
      })
    })

  
  }

  excluir(key: string){
    this.produto_service.excluir(key);
  }

  editar(key: string) {
    this.router.navigate(['produto/formulario/' + key])
  }


} 
