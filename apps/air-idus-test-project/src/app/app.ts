import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Home } from "../module/home";


@Component({
  imports: [RouterModule, Home],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

}
