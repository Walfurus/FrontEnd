import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FireStateFacade } from 'src/app/services/firecache.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { matchFieldRegex } from 'src/app/shared/match.directive';

@Component({
  selector: 'app-add-client',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddClientComponent implements OnInit {

  createClientForm!: FormGroup;
  constructor(
    private fires: FireStateFacade,
    private router: Router,
    private sb: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.createClientForm = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required]),
      pconfirm: new FormControl('', [Validators.required]),
    }, {
      validators: matchFieldRegex('phone', 'pconfirm', /^(?!0+$)(?:\(?\+\d{1,3}\)?[- ]?|0)?\d{10}$/gm),
    });
  }

  async onAddClient() {
    if (!this.createClientForm.valid) {
      console.log('Form not valid');
      this.sb.errorSnack('Please ensure all fields have a value!');
      return;
    }

    try {
      const formData = this.createClientForm.value;
      await this.fires.FromCollection(this.fires.CollectionPaths.AllClientMembers).Add(formData);
      await this.router.navigate(['main/client/view']);
    } catch (e) {
      throw e;
    }
  }
}
