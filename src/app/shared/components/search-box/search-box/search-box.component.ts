import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { MixService as PokedexService } from '../../../../services/mix.service';

@Component({
  selector: 'app-search-box',
  imports: [],
  templateUrl: './search-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent {

  pokemonService = inject(PokedexService);
  pokemonQuery = output<string>();

  searchElement(query:string){

    this.pokemonQuery.emit(query);

  }

}
