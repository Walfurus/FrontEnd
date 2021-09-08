import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FireStateFacade } from 'src/app/services/firecache.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPass: Boolean = false;

  constructor(
    private fires: FireStateFacade,
    private router: Router,
    private sb: SnackbarService) { }

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  async submitForm() {
    if(!this.loginForm.valid) {
      this.sb.errorSnack('Please ensure all required fields have a value.')
      return;
    }

    const formValue = this.loginForm.value;
    try {
      await this.fires.app.login(formValue.email, formValue.password);
      await this.router.navigate(['main/users']);
    } catch (e) {
      console.log('LOGIN ERROR',e);
      this.sb.errorSnack('Invalid login details.')
    }
  }

  async routeToRegister() {
    await this.router.navigate(['auth/register'])
  }

}
