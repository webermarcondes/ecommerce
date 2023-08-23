import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';
import { HomeComponent } from './home/home.component';
import { CategoriaFormularioComponent } from './categoria/categoria-formulario/categoria-formulario.component';
import { CategoriaListarComponent } from './categoria/categoria-listar/categoria-listar.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'categoria',
    component: CategoriaComponent,
    children: [
      { path: '', redirectTo: 'listar', pathMatch: 'full'},
      { path: 'listar', component: CategoriaListarComponent },
      { path: 'formulario', component: CategoriaFormularioComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
