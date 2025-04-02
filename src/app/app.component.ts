import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login/login.component";
import { RepositoriesListComponent } from './rep/repositories-list/repositories-list.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent,RepositoriesListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  loadData:boolean =false;

  title = 'repositorySearchApp';

  onDataReceived(data: {isToken:boolean}) {

    this.loadData=data.isToken;

  }
}
