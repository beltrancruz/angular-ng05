import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../interfaces/heros.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HerosService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getHeros() : Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHero(id: string) : Observable<Hero>{
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`);
  }

  getSuggestions(q: string) : Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${q}&_limit=5`);
  }

  saveHero(hero:Hero) : Observable<Hero>{
    return this.http.post<Hero>(`${this.baseUrl}/heroes`,hero);
  }

  updateHero(hero:Hero) : Observable<Hero>{
    return this.http.put<Hero>(`${this.baseUrl}/heroes/${hero.id}`,hero);
  }

  deleteHero(id: string) : Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/heroes/${id}`);
  }
}
