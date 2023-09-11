import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-listar',
  templateUrl: './usuario-listar.component.html',
  styleUrls: ['./usuario-listar.component.scss']
})
export class UsuarioListarComponent implements OnInit {

  public dados: Array<any> = [];

  constructor(
    public usuario_service: UsuarioService,
    public router: Router
  ) {}
  
  ngOnInit(): void {
    
    this.usuario_service.listar()
    .on('value', (snapshot: any) => {

      //Limpa a variável local com os dados
      this.dados.splice(0, this.dados.length);

      //Dados retornados do Firebase
      let response = snapshot.val();

      //Não setar valores caso não venha nenhum registro
      if(response==null) return;


      Object.values(response).forEach((e: any, i: number) => {

        this.dados.push({

          nome: e.nome,
          email: e.email,
          senha: e.senha,
          indice: Object.keys(snapshot.val())[i]

        })



      })
    })
  }


  excluir(key: string) {
    this.usuario_service.excluir(key)
  }

  editar(key: string) {
    this.router.navigate(['usuario/formulario/' + key])   
  }
}
