import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Species } from '../../../../interface/arrayInterfaces';

@Component({
  selector: 'app-card',
  imports: [ CommonModule, TitleCasePipe],
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {

  router =inject(Router);
  id = input<string>();
  name = input<string>();
  ImageURL = input<string>();
  pokemonType = input<Species[]>([]);

  showDetails() {
    this.router.navigate(['primary',this.id()])
  }

  // pokColorClass(){
  //   return{
  //     'bg-orange-50':this.name() === 'charmander',
  //   }

  // }
}
