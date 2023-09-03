import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria-listar',
  templateUrl: './categoria-listar.component.html',
  styleUrls: ['./categoria-listar.component.scss']
})
export class CategoriaListarComponent implements OnInit {
  public dados: Array<any> = []

  constructor(

    public categoria_service:CategoriaService,
    public router: Router
  ) {

  }
  ngOnInit(): void {
    this.categoria_service.listar()
    .on('value', (snapshot: any) => {
      
      //Limpa a variável local com os dados
      this.dados.splice(0, this.dados.length);

      //Dados retornados do Firebase
      let response = snapshot.val();

      //Não setar valores caso não venha nenhum registro
      if (response == null) return;

      Object.values( response )
        .forEach( (e:any,i:number) => {

          //Adiciona os elementos no vetor de dados
          this.dados.push({

            descricao: e.descricao,
            valor: e.valor,
            indice: Object.keys(snapshot.val())[i]

          });
      })

    });
      }

  excluir(key: string) {
    this.categoria_service.excluir(key);  
  }
  
  editar(key: string) {
    this
    .router
    .navigate(['/categoria/formulario/' + key]);

  }
  }


