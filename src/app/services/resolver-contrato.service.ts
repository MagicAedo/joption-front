import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ContratoInterface } from '../Interfaces/contrato.interface';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverContratoService implements Resolve<ContratoInterface>{

  constructor(private appService:AppService) { }

    
  resolve(): 
    Observable<ContratoInterface>|Promise<ContratoInterface>|ContratoInterface{
    return this.appService.verContratos();
  }

}
