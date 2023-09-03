import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';
import { HomeComponent } from './home/home.component';
import { CategoriaFormularioComponent } from './categoria/categoria-formulario/categoria-formulario.component';
import { CategoriaListarComponent } from './categoria/categoria-listar/categoria-listar.component';
import { FormapagtComponent } from './formapagt/formapagt.component';
import { FormapagtListarComponent } from './formapagt/formapagt-listar/formapagt-listar.component';
import { FormapagtFormularioComponent } from './formapagt/formapagt-formulario/formapagt-formulario.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
