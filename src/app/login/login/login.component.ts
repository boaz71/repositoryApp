import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { response } from 'express';
import { RepositoriesService } from '../../services/repositories.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService,private repService:RepositoriesService)  {}
  ngOnInit(): void {

    
    // this.authService.getString().subscribe(response =>{
    //   alert(response);
    // })
  }

  @Output() getToken =new EventEmitter<{isToken:boolean}>(); 

  onLogin() {

    

    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('token', response.token);
        this.getToken.emit({isToken:true});

      },
      (error) => {
        console.error('Login failed:', error);
        this.getToken.emit({isToken:false});
        alert('Invalid credentials');
      }
    );
  }
}
