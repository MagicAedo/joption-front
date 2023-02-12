import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CategoriaInterface } from '../Interfaces/categoria.interface';
import { FreelancerInterface } from '../Interfaces/freelancer.interface';
import { ContratoInterface } from '../Interfaces/contrato.interface';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = "https://jobtion-backend.up.railway.app";

  //Se definen los diferentes getters que se van a utilizar en la aplicacion

  verCategorias(): Observable<CategoriaInterface>{ 
    const urlRequest: string = `${this.apiUrl}/categoria`;
    return this.http.get<CategoriaInterface>(urlRequest);
  }

  verFreelancer(): Observable<FreelancerInterface>{
    const urlRequest: string = `${this.apiUrl}/freelancer`;
    return this.http.get<FreelancerInterface>(urlRequest);
  }

  verFreelancerPorId(idFreelancer:string):Observable<FreelancerInterface>{ 
    const urlRequest: string = `${this.apiUrl}/freelancer/${idFreelancer}`;
    return this.http.get<FreelancerInterface>(urlRequest);
  }

  verFreelancerPorCategoria(idCategoria:string): Observable<FreelancerInterface>{
    const urlRequest: string = `${this.apiUrl}/freelancer/categoria/${idCategoria}`;
    return this.http.get<FreelancerInterface>(urlRequest);
  }

  verContratos():Observable<ContratoInterface>{
    const urlRequest: string = `${this.apiUrl}/contrato`;
    return this.http.get<ContratoInterface>(urlRequest); 
  }

  //Se definen los Post que se van a utilizar en la aplicacion
  agregarNuevoContrato(newContract:any){ 
    const urlRequest: string = `${this.apiUrl}/contrato`
    return this.http.post(urlRequest,newContract);
  }




}
