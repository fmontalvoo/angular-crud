import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';

import { HeroesService } from '../../services/heroes-service.service';

import { HeroeModel } from '../../models/heroe.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  public heroe: HeroeModel;

  constructor(private heroesService: HeroesService, private reoute: ActivatedRoute) {
    this.heroe = new HeroeModel();
  }

  ngOnInit(): void {
    const id = this.reoute.snapshot.paramMap.get('id');
    if (id !== '-1') {
      this.heroesService.read(id).subscribe(
        (response: HeroeModel) => {
          this.heroe = response;
          this.heroe.id = id;
        }
      );
    }
  }

  public guardar(formulario: NgForm): void {
    if (formulario.invalid) return;

    Swal.fire({
      title: 'Guardando',
      text: 'Guardando registro...',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.save(this.heroe);
  }

  private save(heroe: HeroeModel): void {
    let request: Observable<any>;

    if (heroe.id)
      request = this.heroesService.update(this.heroe);
    else
      request = this.heroesService.create(this.heroe);

    request.subscribe(
      response => Swal.fire({
        title: heroe.nombre,
        text: 'Registro guardado con exito',
        type: 'success'
      }),
      error => console.log(error)
    );
  }

}
