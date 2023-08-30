import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    public firebase_service:FirebaseService
  ) { }

  ref() {
    return  this.firebase_service.ref().child('/categoria');
  }

  salvar(dados: any){
    this.ref().push(dados).then();
  }


  listar() {
    return this.ref();
  }

  excluir(indice: string){
    return this.ref().child("/" + indice).remove().then()
  }

  editar(indice:string, dados:any) {

    this.ref().child('/' + indice).update(dados).then();
  }
}
