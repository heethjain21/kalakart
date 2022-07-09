import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tagline = 'A new, never-like before experience!';
  desc = 'Contributing to the socio-economic growth of the rural artisans by expanding their reach online to the entire nation with tech!';

  constructor() { }

  ngOnInit() {

  }

}