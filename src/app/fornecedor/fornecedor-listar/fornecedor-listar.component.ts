import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EstadoService } from 'src/app/estado/estado.service';
import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-fornecedor-listar',
  templateUrl: './fornecedor-listar.component.html',
  styleUrls: ['./fornecedor-listar.component.scss']
})
export class FornecedorListarComponent {    
  
  public dados: Array<any> = [];
  
  constructor(
    public estado_service: EstadoService,
    public fornecedor_service: FornecedorService,
    public router: Router
  ){}
  
  ngOnInit(): void {
    this.fornecedor_service.listar()
    .on('value', (snapshot: any) => {

      //Limpa a váriavel local com os dados
      this.dados.splice(0, this.dados.length);

      //Dados retornados do Firebase
      let response = snapshot.val();

      //Não setar valores caso não venha nenhum registro
      if(response==null) return;

      Object.values(response).forEach(async (e: any, i: number) => {

        let estado_nome: any = await this.estado_service.get(e.estado);

        this.dados.push({
          nome_fantasia: e.nome_fantasia,
          razao_social: e.razao_social,
          estado: estado_nome.nome,
          indice: Object.keys(snapshot.val())[i]
        })
      })
    })
    
  }


  excluir(key: string){
    this.fornecedor_service.excluir(key);
  }

  editar(key: string) {
    this.router.navigate(['fornecedor/formulario/' + key])
  }

}
