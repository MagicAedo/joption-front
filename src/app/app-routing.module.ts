import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CardsComponent } from './pages/cards/cards.component';
import { ContratosComponent } from './pages/contratos/contratos.component';
import { FormContratoComponent } from './pages/form-contrato/form-contrato.component';
import { HomeComponent } from './pages/home/home.component';
import { ResolverContratoService } from './services/resolver-contrato.service';
import { ResolverFreelanceContratoService } from './services/resolver-freelance-contrato.service';
import { ResolverFreelancerService } from './services/resolver.service';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'cards/:id',
    component:CardsComponent,
    resolve: {
      freelancer: ResolverFreelancerService
    }
  },
  {
    path:'contratos',
    component:ContratosComponent,
    resolve: {
      contrato: ResolverContratoService
    }
  },
  {
    path:'about',
    component:AboutComponent
  },
  {
    path:'creacion-contrato/:id',
    component:FormContratoComponent,
    resolve:{
      freelancer: ResolverFreelanceContratoService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
