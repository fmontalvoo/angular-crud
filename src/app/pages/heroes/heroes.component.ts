import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes-service.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  public heroes: HeroeModel[];
  public loading: boolean;

  constructor(private heroesService: HeroesService) {
    this.heroes = [];
  }

  ngOnInit(): void {
    this.loading = true;
    this.heroesService.getHerores().subscribe(response => {
      this.heroes = response;
      this.loading = false;
    });
  }

  public eliminarHeroe(heroe: HeroeModel, idx: number): void {
    Swal.fire({
      title: 'Eliminar',
      text: `¿Esta seguro de eliminar a ${heroe.nombre}?`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(response => {
      if (response.value)
        this.heroesService.delete(heroe).subscribe(
          response => this.heroes.splice(idx, 1),
          error => console.log(error)
        );
    });
  }

}
