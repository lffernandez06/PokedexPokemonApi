import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page/home-page.component';
import { LayoutComponent } from './shared/layout/layout/layout.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent,

      },

      {
        path: 'primary',
        loadComponent: () =>
          import('./pages/primary-page/primary-page/primary-page.component'),

        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './pages/pokemon-page/pokemon-page/pokemon-page.component'
              ),
              canActivate:[authGuard],

          },
           {
              path: ':pokemonId',
              loadComponent: () => import('./pages/pokemons-details/pokemons-details/pokemons-details.component'),
              canActivate:[authGuard],


            },
        ],

      },

      //Estoy debe ir de ultimo porque si se coloca
      // antes redirecciona enseguida a la pagina
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];
