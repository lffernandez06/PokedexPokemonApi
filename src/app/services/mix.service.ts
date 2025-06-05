import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import {  catchError, EMPTY, map, Observable, of } from 'rxjs';
import {
  PokeResponse,
  PokemonDetails,
  PokeAbilities,
} from '../interface/arrayInterfaces';

@Injectable({ providedIn: 'root' })
export class MixService {
  http = inject(HttpClient);
  errorMessage = signal<string>('');

  constructor() {
    this.loadPokeApi();
  }

  getAuthToken():Observable<boolean>{
   return this.loadPokeApi().pipe(
           catchError((error:string)=>{
            this.errorMessage.set(error);
            return EMPTY;
          })
         ).pipe(map((resp)=>{

         if(resp){
          return true
         } return false
         }) )

  }

  loadPokeApi(limit = 1200) {
    return this.http
      .get<PokeResponse>(
        `${environment.pokeUrl}/pokemon?limit=${limit}&offset=0`)

  }

  loadPokemonsDetails(id: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(
      `${environment.pokeDetailsURL}/${id}/`
    );
  }
  loadPokemonsImages(id: string) {
    return `${environment.pokeImagesURL}/${id}.png`;
  }
  //   loadPokeApi():Observable<Result[]>{

  //   return this.http.get<PokeResponse>(`${environment.pokeUrl}/pokemon?limit=100000&offset=0`)
  //   .pipe(map(response => response.results ))

  // }

  loadAbilities(id: string | undefined): Observable<PokeAbilities> {
    return this.http.get<PokeAbilities>(
      `${environment.pokemonAbilitiesUrl}/${id}/`
    );
  }

  searchItem(query: string) {
    return this.http.get(`${environment.pokemonSearchUrl}/${query}`);
  }
}
