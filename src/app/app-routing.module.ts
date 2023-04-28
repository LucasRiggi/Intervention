import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ProblemeComponent } from './probleme/probleme.component';

const routes: Routes = [
  {path:'acceuil',component:AccueilComponent},
  {path:'probleme',component:ProblemeComponent},
  {path:'',redirectTo:'acceuil',pathMatch:'full'},
  {path:'**',redirectTo:'acceuil',pathMatch:'full'}, // si la route est inexistante rediriger l'user
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
