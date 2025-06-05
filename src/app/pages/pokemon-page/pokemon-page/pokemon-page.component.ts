import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { MixService } from '../../../services/mix.service';
import { Pokemon } from '../../../interface/arrayInterfaces';
import { catchError, EMPTY, map } from 'rxjs';
import { SearchBoxComponent } from "../../../shared/components/search-box/search-box/search-box.component";
import { CardComponent } from "../../../shared/components/cards/card/card.component";
import { environment } from '../../../../environments/environment.development';
import { ErrorMessageComponent } from "../../error/error-message/error-message.component";

@Component({
  selector: 'app-pokemon-page',
  imports: [SearchBoxComponent, CardComponent, ErrorMessageComponent],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {


  loadPokemons = inject(MixService);
  pokemonsList = signal<Pokemon[]>([]);
  // pokemonDetails = signal();
  pokemonImages = signal<string[]>([]);
  searchTerm = signal<string>('');
  errorMessage = signal<string>('');



  filteredPokemons = computed(() =>
  this.pokemonsList()
    .filter(pokemon =>
      pokemon.name.toLowerCase()
      .includes(this.searchTerm().toLowerCase()))
  );

  ngOnInit(): void {

  }

  pokemonSearByName(query:string){
    this.searchTerm.set(query);
  }

  checkPokeApi() {
     this.loadPokemons.loadPokeApi().pipe(
      catchError((error:string)=>{
        this.errorMessage.set(error);
        return EMPTY;
      })
     ).subscribe((resp)=>{
      this.pokemonsList.set(resp.results);
        const a = resp.results.map( (pokemon) => {
          const id = pokemon.url.split('/').filter(Boolean).pop();
          return {
            name: pokemon.name,
            url: pokemon.url,
            imageURL: `${environment.pokeImagesURL}/${id}.png`,
            id,
          }
        })
        this.pokemonsList.set(a);
      })


      this.loadPokemons.loadPokeApi().subscribe();

    }
  }





 // resp.results.forEach(element =>{

      //   for( let i=1; i <= resp.results.length ; i++ ){

      //     let apiDetails= `${environment.pokeDetailsURL}/${i}/`

      //    if(element.url === apiDetails ){
      //     this.loadPokemons.loadPokemonsDetails(i.toString())
      //     .subscribe(
      //       (resp)=>{
      //         console.log(resp);
      //       }
      //     );
      //     break;
      //   }

      // }
      // })




  // checkPokeApi() {
  //   this.loadPokemons.loadPokeApi().subscribe((resp)=>{

  //     resp.forEach( item => {
  //       console.log('name',item.name)
  //     })

  //     console.log(resp)
  //   })

  // }


