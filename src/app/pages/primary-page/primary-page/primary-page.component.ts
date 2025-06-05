import { ChangeDetectionStrategy, Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-primary-page',
  imports: [RouterOutlet],
  templateUrl: './primary-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PrimaryPageComponent { }
