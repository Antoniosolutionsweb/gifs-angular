import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
})
export class ResultadosComponent {
  get resultado(){
    return this.gifsService.resultado
  }
  constructor(private gifsService:GifsService){}
}
