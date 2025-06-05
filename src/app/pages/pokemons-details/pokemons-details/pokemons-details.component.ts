import { ChangeDetectionStrategy, Component, computed, inject, signal,} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { MixService } from '../../../services/mix.service';
import { environment } from '../../../../environments/environment.development';
import { TitleCasePipe } from '@angular/common';
import { ErrorMessageComponent } from "../../error/error-message/error-message.component";
import { Species } from '../../../interface/arrayInterfaces';

@Component({
  selector: 'app-pokemons-details',
  imports: [TitleCasePipe, ErrorMessageComponent],
  templateUrl: './pokemons-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsDetailsComponent {

  pokemonService = inject(MixService);

  pokemonStats = signal<{ name: string, baseStat: number, effort: number }[]>([]);;
  pokemonVersions = signal<string[]>([]);
  pokemonName = signal<string>('');
  pokemonImage = signal<string>('');
  abilityEfects = signal<string[]>([]);
  abilitiyId = signal<(string | undefined)[]>([]);
  pokemonAbility = signal<{ name?: string; id?: string }[]>([]);
  errorMessage = signal<string>('');
  pokemonId = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['pokemonId']))
  );
  pokemonType = signal<Species[]>([]);

  constructor(){
    this.loadImageDetails(),
    this.loadPokemonName(),
    this.loadpokemonStats()

  }
  loadPokemonDetailsToPage() {
    this.pokemonService
      .loadPokemonsDetails(this.pokemonId())
      .pipe(
            catchError((error:string)=>{
              this.errorMessage.set(error);
              return EMPTY;
            })
           )
      .subscribe((response) => {
        const abilities = response.abilities.map((ability) => ({
          name: ability.ability?.name,
          id: ability.ability?.url.split('/').slice(-2, -1)[0],
        }));

        this.pokemonAbility.set(abilities);
        const ids = abilities.map((ability) => ability.id);
        this.abilitiyId.set(ids);
      });

  }



  firePokemons(){
    return {

    }
  }

  loadPokemonName(){
    this.pokemonService.loadPokemonsDetails(this.pokemonId()).pipe(
      catchError((error:string)=>{
        this.errorMessage.set(error);
        return EMPTY;
      })
     ).subscribe(
      (resp) => {
        	let name = resp.forms[0].name;
          let type = resp.types.map((resp)=> resp.type );
          this.pokemonName.set(name);
          this.pokemonType.set(type);
      }
    )
  }

  loadpokemonStats(){
    this.pokemonService.loadPokemonsDetails(this.pokemonId()).pipe(
      catchError((error:string)=>{
        this.errorMessage.set(error);
        return EMPTY;
      })
     ).subscribe(
      (resp)=>{
       const a = resp.stats.map((stats)=>({
            name: stats.stat.name,
            baseStat: stats.base_stat,
            effort: stats.effort,

        }))

        this.pokemonStats.set(a);
      }
    )
  }

  loadPokemonType(){

  }

  loadPokemonFeatures(){
   this.pokemonService.loadPokemonsDetails(this.pokemonId()).pipe(
      catchError((error:string)=>{
        this.errorMessage.set(error);
        return EMPTY;
      })
     )

   .subscribe(

    (resp) => {
      let version = resp.game_indices.map((gameVersion) => {
        return gameVersion.version.name
      })

      this.pokemonVersions.set(version)
      console.log(version)

    }

   )
  }



  loadImageDetails(){

      this.pokemonImage.set(
      `${environment.pokeImagesURL}/${this.pokemonId()}.png`
    );

  }

  loadEfectsById(id: string | undefined) {
    this.pokemonService.loadAbilities(id).pipe(
      catchError((error:string)=>{
        this.errorMessage.set(error);
        return EMPTY;
      })
     ).subscribe((resp) => {
      this.abilityEfects.set([
        resp.effect_entries[0].effect,
        resp.effect_entries[1].effect,
      ]);
    });
  }
}
