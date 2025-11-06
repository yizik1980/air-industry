import { Component } from '@angular/core';
import { Main } from '../components/main';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
@Component({
  selector: 'app-home',
  imports: [Main, Header, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home { }
