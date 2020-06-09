import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(private authService: AuthService,
    private _flashMessagesService: FlashMessagesService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      const result = data as any
      if (result.success) {
        this.authService.storeUserData(result.token, result.user)
        this._flashMessagesService.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000})
        this.router.navigate(['/blog'])
      } else {
        this._flashMessagesService.show(result.msg, {cssClass: 'alert-danger', timeout: 5000})
        this.router.navigate(['login'])
      }
    })
  }
}
