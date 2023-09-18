import { Component } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-listar',
  templateUrl: './cliente-listar.component.html',
  styleUrls: ['./cliente-listar.component.scss']
})
export class ClienteListarComponent {

  public dados: Array<any> = [];

  
  constructor(

    public cliente_service:ClienteService,
    public router: Router
  ) {

  }
  ngOnInit(): void {
    this.cliente_service.listar()
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

            nome: e.nome,
            cpf: e.cpf,
            dat_nas: e.dat_nas,
            celular: e.celular,
            email: e.email,
            indice: Object.keys(snapshot.val())[i]

          });
      })

    });
      }

  excluir(key: string) {
    this.cliente_service.excluir(key);  
  }
  
  editar(key: string) {
    this
    .router
    .navigate(['/cliente/formulario/' + key]);

  }

}
