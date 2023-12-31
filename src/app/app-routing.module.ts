import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';
import { HomeComponent } from './home/home.component';
import { CategoriaFormularioComponent } from './categoria/categoria-formulario/categoria-formulario.component';
import { CategoriaListarComponent } from './categoria/categoria-listar/categoria-listar.component';
import { FormapagtComponent } from './formapagt/formapagt.component';
import { FormapagtListarComponent } from './formapagt/formapagt-listar/formapagt-listar.component';
import { FormapagtFormularioComponent } from './formapagt/formapagt-formulario/formapagt-formulario.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { SubcategoriaListarComponent } from './subcategoria/subcategoria-listar/subcategoria-listar.component';
import { SubcategoriaFormularioComponent } from './subcategoria/subcategoria-formulario/subcategoria-formulario.component';
import { UsuarioFormularioComponent } from './usuario/usuario-formulario/usuario-formulario.component';
import { UsuarioListarComponent } from './usuario/usuario-listar/usuario-listar.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProdutoListarComponent } from './produto/produto-listar/produto-listar.component';
import { ProdutoFormularioComponent } from './produto/produto-formulario/produto-formulario.component';
import { ClienteListarComponent } from './cliente/cliente-listar/cliente-listar.component';
import { ClienteFormularioComponent } from './cliente/cliente-formulario/cliente-formulario.component';
import { PedidoListarComponent } from './pedido/pedido-listar/pedido-listar.component';
import { PedidoFormularioComponent } from './pedido/pedido-formulario/pedido-formulario.component';
import { EstadoListarComponent } from './estado/estado-listar/estado-listar.component';
import { EstadoFormularioComponent } from './estado/estado-formulario/estado-formulario.component';
import { EstadoComponent } from './estado/estado.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ProdutoComponent } from './produto/produto.component';
import { FornecedorListarComponent } from './fornecedor/fornecedor-listar/fornecedor-listar.component';
import { FornecedorFormularioComponent } from './fornecedor/fornecedor-formulario/fornecedor-formulario.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'categoria',
    component: CategoriaComponent,
    children: [
      { path: '', redirectTo: 'listar', pathMatch: 'full'},
      { path: 'listar', component: CategoriaListarComponent },
      { path: 'formulario', component: CategoriaFormularioComponent },
      { path: 'formulario/:indice', component:CategoriaFormularioComponent}
    ]
  },
  {
    path: 'formapagt',
    component: FormapagtComponent,
    children: [
      {path: '', redirectTo: 'listar', pathMatch: 'full'},
      {path: 'listar', component: FormapagtListarComponent},
      {path: 'formulario', component: FormapagtFormularioComponent},
      {path: 'formulario/:indice', component: FormapagtFormularioComponent}
    ]
  },
  {
    path: 'subcategoria',
    component: SubcategoriaComponent,
    children: [
      {path: '', redirectTo: 'listar', pathMatch: 'full'},
      {path: 'listar', component: SubcategoriaListarComponent},
      {path: 'formulario', component: SubcategoriaFormularioComponent},
      {path: 'formulario/:indice', component: SubcategoriaFormularioComponent}
    ]
    
  },
  {
    path: 'usuario',
    component: UsuarioComponent,
    children: [
      {path: '', redirectTo: 'listar', pathMatch: 'full'},
      {path: 'listar', component: UsuarioListarComponent},
      {path: 'formulario', component: UsuarioFormularioComponent},
      {path: 'formulario/:indice', component: UsuarioFormularioComponent}
    ]
    
  },
  {
    path: 'produto',
    component: ProdutoComponent,
    children: [
      {path: '', redirectTo: 'listar', pathMatch: 'full'},
      {path: 'listar', component: ProdutoListarComponent},
      {path: 'formulario', component: ProdutoFormularioComponent},
      {path: 'formulario/:indice', component: ProdutoFormularioComponent}
    ]
    
  },
  {
    path: 'cliente',
    component: ClienteComponent,
    children: [
      {path: '', redirectTo: 'listar', pathMatch: 'full'},
      {path: 'listar', component: ClienteListarComponent},
      {path: 'formulario', component: ClienteFormularioComponent},
      {path: 'formulario/:indice', component: ClienteFormularioComponent}
    ]
    
  },
  {
    path: 'pedido',
    component: PedidoComponent,
    children: [
      {path: '', redirectTo: 'listar', pathMatch: 'full'},
      {path: 'listar', component: PedidoListarComponent},
      {path: 'formulario', component: PedidoFormularioComponent},
      {path: 'formulario/:indice', component: PedidoFormularioComponent}
    ]
    
  },
  {
    path: 'estado',
    component: EstadoComponent,
    children: [
      {path: '', redirectTo: 'listar', pathMatch: 'full'},
      {path: 'listar', component: EstadoListarComponent},
      {path: 'formulario', component: EstadoFormularioComponent},
      {path: 'formulario/:indice', component: EstadoFormularioComponent}
    ]
    
  },

  {
    path: 'fornecedor',
    component: FornecedorComponent,
    children: [
      {path: '', redirectTo: 'listar', pathMatch: 'full'},
      {path: 'listar', component: FornecedorListarComponent},
      {path: 'formulario', component: FornecedorFormularioComponent},
      {path: 'formulario/:indice', component: FornecedorFormularioComponent}
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
