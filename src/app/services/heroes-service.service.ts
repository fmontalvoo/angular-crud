import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/config.vars';

import { HeroeModel } from '../models/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private URL: string = environment.url;

  constructor(private http: HttpClient) { }

  public create(heroe: HeroeModel): Observable<HeroeModel> {
    return this.http.post(`${this.URL}/heroes.json`, heroe)
      .pipe(
        map((response: any) => {
          heroe.id = response.name;
          return heroe;
        })
      );
  }

  public read(id: string) {
    return this.http.get(`${this.URL}/heroes/${id}.json`);
  }

  public update(heroe: HeroeModel): Observable<Object> {
    let aux: HeroeModel = {
      ...heroe
    };
    delete aux.id;
    return this.http.put(`${this.URL}/heroes/${heroe.id}.json`, aux);
  }

  public delete(heroe: HeroeModel) {
    return this.http.delete(`${this.URL}/heroes/${heroe.id}.json`);
  }

  public getHerores() {
    return this.http.get(`${this.URL}/heroes.json`)
      .pipe(
        map(this.toList)
      );
  }
  private toList(response: object): Array<HeroeModel> {

    if (response === null) return [];

    let heroes: Array<HeroeModel> = Array<HeroeModel>();
    Object.keys(response).forEach(
      key => {
        const heroe: HeroeModel = response[key];
        heroe.id = key;

        heroes.push(heroe);
      }
    );
    return heroes;
  }
}
