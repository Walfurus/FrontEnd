import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FireStateFacade } from 'src/app/services/firecache.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
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
      email: new FormControl('', [Validators.required]),
    });
  }

}
