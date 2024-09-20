import { Component } from '@angular/core';
import { RouterOutlet, RoutesRecognized } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FirebaseApp } from '@angular/fire/app';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AnimalAxis';

  constructor(public app: FirebaseApp) {
    
  }
}


