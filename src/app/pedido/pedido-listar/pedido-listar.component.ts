import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/cliente/cliente.service';
import { FormapagtService } from 'src/app/formapagt/formapagt.service';
import { ProdutoService } from 'src/app/produto/produto.service';
import { PedidoService } from '../pedido.service';

@Component({
  selector: 'app-pedido-listar',
  templateUrl: './pedido-listar.component.html',
  styleUrls: ['./pedido-listar.component.scss']
})
export class PedidoListarComponent {

  public dados: Array<any> = [];

  public constructor(
    public cliente_service: ClienteService,
    public produto_service: ProdutoService,
    public pagamento_service: FormapagtService,
    public pedido_service: PedidoService,
    public router: Router
  ){}


  ngOnInit(): void{
    this.pedido_service.listar()
    .on('value', (snapshot: any) => {

      //Limpa a váriavel local com os dados
      this.dados.splice(0, this.dados.length);

      //Dados retornados do Firebase
      let response = snapshot.val();

      //Não setar valores caso não venha nenhum registro
      if(response==null) return;

      Object.values(response).forEach(async (e: any, i: number) => {

        let cliente_nome: any = await this.cliente_service.get(e.cliente);
        let produto_nome: any = await this.produto_service.get(e.produto);
        let fpag_nome: any = await this.pagamento_service.get(e.fpag);
        
        this.dados.push({
          descricao: e.descricao,
          cliente: cliente_nome.nome,
          produto: produto_nome.nome,
          fpag: fpag_nome.nome,
          indice: Object.keys(snapshot.val())[i]
        })
      
      
      })
    })

  
  }


  excluir(key: string){
    this.pedido_service.excluir(key);
  }

  editar(key: string) {
    this.router.navigate(['pedido/formulario/' + key])
  }

}
