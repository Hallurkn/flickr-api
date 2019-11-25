import { Component } from '@angular/core';

interface NavLink {
  caption: string;
  route: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public navLinks: NavLink[] = [
    {
      caption: 'Home',
      route: '/'
    }
  ];

  constructor() { }
}
