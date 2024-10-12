import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'web';
  helloMsg = 'Loading...';

  ngOnInit(): void {
    fetch('http://localhost:3000/')
      .then((response) => response.json())
      .then((data) => {
        this.helloMsg = data.message;
      });
  }
}
