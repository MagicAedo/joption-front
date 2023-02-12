import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { CategoriaInterface } from 'src/app/Interfaces/categoria.interface';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  categorias!: any;
  categoriaSelected!: number;




  constructor(private appService: AppService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit(): void {
    this.appService.verCategorias().subscribe(this.categoriasObserver);
  }

  //Acá se obtiene las categorias en el observador que está mirando el get request de categorias
  private categoriasObserver = {
    next: (resp: CategoriaInterface) => {
      this.categorias = resp;
    },
    error: (err: string) => console.error("Nya" + err),
  }

  //Pasar la información entre componentes mediante modalcontroller
  


  //Alerta para mostrar que el usuario no coloco bien la información
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      subHeader: 'Categoria erronea',
      message: 'Por favor ingrese una categoria',
      buttons: ['OK'],
    });

    await alert.present();
  }


  //obtener id de la categoria para pasarla a otra vista
  getIdCategoria(nombreCategoria: string) {
    //se busca primero el id de cada categoria haciendo una comparacion con un forEach
    this.categorias.forEach((element: CategoriaInterface) => {
      if (element.nombre == nombreCategoria) {
        this.categoriaSelected = element.id;
      }
    });
    //Si categoriaSelected está undefined quiere decir que no se selecciono nada entonces se presenta un mensaje de alerta
    if (this.categoriaSelected == undefined) {
      this.presentAlert()
      return;
    }
    //Si todo está bien y llega hasta acá, se navega hasta la otra pagina.
    this.router.navigate(['/cards',this.categoriaSelected])
  }
}
