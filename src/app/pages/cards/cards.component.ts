import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FreelancerInterface } from 'src/app/Interfaces/freelancer.interface';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {

  freelancers!:FreelancerInterface[]; 
  randomFreelancer!:  FreelancerInterface;

  contadorFreelancer:number = 1; 

 
  
  constructor(private route:ActivatedRoute, private router: Router){}

  
  ngOnInit(){ 
    this.route.data.subscribe(({freelancer}) => {
      this.freelancers = freelancer; 
      this.randomFreelancer = freelancer[0]
      console.log(this.randomFreelancer)
    }
    )}

    getFreelancer(){ 
      if(this.contadorFreelancer > this.freelancers.length - 1){ 
        this.contadorFreelancer = 0; 
      }
      this.randomFreelancer = this.freelancers[this.contadorFreelancer];
      this.contadorFreelancer++; 
    }

    crearContrato(){ 
      this.router.navigate(['/creacion-contrato',this.randomFreelancer.id])
    }
    


  
}
