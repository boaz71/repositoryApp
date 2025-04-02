import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { LoginComponent } from './login/login/login.component';
import { RepositoriesListComponent } from './rep/repositories-list/repositories-list.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule, LoginComponent, RepositoriesListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'repositorySearchApp';
  loadData = false;
}
