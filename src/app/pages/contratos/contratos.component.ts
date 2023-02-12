import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContratoInterface } from 'src/app/Interfaces/contrato.interface';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent {

  contratos!:ContratoInterface[]; 

  constructor(private route:ActivatedRoute){}

  ngOnInit(){
    this.route.data.subscribe( ({contrato}) => { 
      this.contratos = contrato;
      console.log(this.contratos);
    })
  }

}
