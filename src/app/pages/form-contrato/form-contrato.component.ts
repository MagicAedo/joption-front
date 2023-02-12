import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { ContratoInterface } from 'src/app/Interfaces/contrato.interface';
import { FreelancerInterface } from 'src/app/Interfaces/freelancer.interface';
import { AppService } from 'src/app/services/app.service';
@Component({
  selector: 'app-form-contrato',
  templateUrl: './form-contrato.component.html',
  styleUrls: ['./form-contrato.component.css']
})
export class FormContratoComponent {

  //Este es el freelancer que viene de la anterior vista, al que se le va a crear el contrato
  currentFreelancer!: FreelancerInterface;

  currentMetodoPago!: { id: number, nombreMetodoPago: string };

  //se definen los atributos del formulario de contrato que se van a utilizar para crear un nuevo contrato
  nombreContrato: string = "";
  descripcionContrato: string = "";
  valorContrato!: number;
  metodoPago: string = "";
  fechaActual: string = format(new Date(), 'dd-MM-yyyy')
  fechaHasta: string = "";


  //Se definen los metodos de pago 
  metodosPago: { id: number, nombreMetodoPago: string }[] = [
    {
      "id": 1,
      "nombreMetodoPago": "Paypal"
    },
    {
      "id": 2,
      "nombreMetodoPago": "Western Union"
    },
    {
      "id": 3,
      "nombreMetodoPago": "Tarjeta"
    }
  ];

  constructor(private route: ActivatedRoute, private alertCtrl: AlertController, private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(({ freelancer }) => {
      this.currentFreelancer = freelancer;
    }
    )
  }

  crearContrato() {

    //Se se cumple lo siguiente se crea el contrato
    if (this.nombreContrato.length > 0 && this.descripcionContrato.length > 0 && this.valorContrato > 0 && this.metodoPago.length > 0 && this.fechaActual.length > 0 && this.fechaHasta.length > 0) {
      
      if(this.metodoPago == "Paypal"){
        this.currentMetodoPago = {"id":1,"nombreMetodoPago":this.metodoPago}

      }else if(this.metodoPago == "Western Union"){
        this.currentMetodoPago = {"id":2,"nombreMetodoPago":this.metodoPago}
      }else if(this.metodoPago == "Tarjeta"){
        this.currentMetodoPago = {"id":3,"nombreMetodoPago":this.metodoPago}
      }

      const objContrato = {
        "nombreContrato":this.nombreContrato,
        "descripcion":this.descripcionContrato,
        "fechaInicial":this.fechaActual,
        "fechaFinal":format(parseISO(this.fechaHasta), 'dd-MM-yyyy'),
        "valorContrato":this.valorContrato,
        "freelancer":this.currentFreelancer,
        "metodoPago":this.currentMetodoPago
      }
    
      this.appService.agregarNuevoContrato(objContrato).subscribe(
        resp => {}
      );
      
      this.contratoCreado();
      this.router.navigate(['/home'])



    } else {
      this.alertBadMethod();
    }
  }


  // get fechaNowToComponent(){ 
  //   const date = new Date(); 
  //   return date.toISOString();
  // }

  // mostrarFecha() {
  //   console.log(format(this.fechaNow, 'dd-MM-yyyy'));
  //   console.log(format(parseISO(this.fechaHasta), 'dd-MM-yyyy'));
  // }


  //Alerta para mostrar que el usuario no coloco bien la información
  async alertBadMethod() {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      subHeader: 'Información erronea',
      message: 'Campos erroneos, por favor corrija.',
      buttons: ['OK'],
    });

    await alert.present();
  }


  async contratoCreado() {
    const alert = await this.alertCtrl.create({
      header: 'Contrato creado exitosamente',
      message: 'Se le va a redireccionar a inicio',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Desea confirmar la creación del contrato?',
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Si',
        },
      ],
    });

    await alert.present();
  }




}
