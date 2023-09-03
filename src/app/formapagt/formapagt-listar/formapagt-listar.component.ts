import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormapagtService } from '../formapagt.service';

@Component({
  selector: 'app-formapagt-listar',
  templateUrl: './formapagt-listar.component.html',
  styleUrls: ['./formapagt-listar.component.scss']
})
export class FormapagtListarComponent implements OnInit{

  public dados: Array<any> = []

  constructor(
    public formapagt_service: FormapagtService,
    public router: Router
  ) {}


  ngOnInit(): void {
    this.formapagt_service.listar()
    .on('value', (snapshot: any) => {


      //Limpa a variável local com os dados
      this.dados.splice(0, this.dados.length);
      
      //Dados retornados do Firebase
      let response = snapshot.val();

      //Não setar valores caso não venha nenhum registro
      if(response == null) return;

      Object.values( response ).forEach( (e: any, i: number) => {


        //Adiciona os elementos no vetor de dados 
        this.dados.push({

          nome: e.nome,
          obs: e.obs,
          indice: Object.keys(snapshot.val())[i]
        })



      })
    })
  }

  excluir(key: string) {
    this.formapagt_service.excluir(key)
  }

  editar(key: string) {
    this
    .router
    .navigate(['/formapagt/formulario/' + key])
  }

}

