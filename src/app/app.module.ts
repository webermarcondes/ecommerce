import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaListarComponent } from './categoria/categoria-listar/categoria-listar.component';
import { CategoriaFormularioComponent } from './categoria/categoria-formulario/categoria-formulario.component';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormsModule } from '@angular/forms';
import { FormapagtComponent } from './formapagt/formapagt.component';
import { FormapagtListarComponent } from './formapagt/formapagt-listar/formapagt-listar.component';
import { FormapagtFormularioComponent } from './formapagt/formapagt-formulario/formapagt-formulario.component';
import { SubcategoriaFormularioComponent } from './subcategoria/subcategoria-formulario/subcategoria-formulario.component';
import { SubcategoriaListarComponent } from './subcategoria/subcategoria-listar/subcategoria-listar.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioFormularioComponent } from './usuario/usuario-formulario/usuario-formulario.component';
import { UsuarioListarComponent } from './usuario/usuario-listar/usuario-listar.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    MenuComponent,
    CategoriaComponent,
    CategoriaListarComponent,
    CategoriaFormularioComponent,
    FormapagtComponent,
    FormapagtListarComponent,
    FormapagtFormularioComponent,
    SubcategoriaComponent,
    SubcategoriaFormularioComponent,
    SubcategoriaListarComponent,
    UsuarioComponent,
    UsuarioFormularioComponent,
    UsuarioListarComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({

      apiKey: "AIzaSyByTC8xMAC9N8lXOF_qDKM4kbw42GwR5HU",
      authDomain: "ecommerce-ads2023-4-2-c3a67.firebaseapp.com",
      projectId: "ecommerce-ads2023-4-2-c3a67",
      storageBucket: "ecommerce-ads2023-4-2-c3a67.appspot.com",
      messagingSenderId: "105150751379",
      appId: "1:105150751379:web:d802cac2dcb6edcbcbe366",
      measurementId: "G-XZGZH53BN1"
    }
    ),
    AngularFireStorageModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
