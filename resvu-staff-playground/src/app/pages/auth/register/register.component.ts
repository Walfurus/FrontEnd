import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FireStateFacade } from 'src/app/services/firecache.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { matchFieldRegex } from 'src/app/shared/match.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showPass = false;
  showConf = false;

  constructor(
    private fires: FireStateFacade,
    private router: Router,
    private sb: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirm: new FormControl('', [Validators.required]),
    }, {
      validators: matchFieldRegex('password', 'confirm', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/gm),
    });
  }

  async submitForm() {
    if (!this.registerForm.valid) {
      this.sb.errorSnack('Please ensure all required fields have a value.');
      return;
    }

    const formValue = this.registerForm.value;
    try {
      await this.fires.app.appSDK
      .auth().createUserWithEmailAndPassword(formValue.email, formValue.password);
      await this.router.navigate(['auth/login']);
    } catch (e) {
      console.log('REGISTRATION ERROR', e);
    }
  }

  async routeToLogin() {
    await this.router.navigate(['auth/login']);
  }

}
