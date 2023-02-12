import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FreelancerInterface } from '../Interfaces/freelancer.interface';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverFreelancerService implements Resolve<FreelancerInterface>{

  constructor(private appService:AppService) { }

    
  resolve(
    route:ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<FreelancerInterface>|Promise<FreelancerInterface>|FreelancerInterface{
    return this.appService.verFreelancerPorCategoria(route.paramMap.get('id')!);
  }

}
