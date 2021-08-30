import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FireStateFacade } from 'src/app/services/firecache.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddStaffComponent implements OnInit {
  submitted = false;
  createStaffForm!: FormGroup;
  constructor(
    private fires: FireStateFacade,
    private router: Router,
    private sb: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.createStaffForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  async onAddStaff() {
    if (!this.createStaffForm.valid) {
      console.log('Form not valid');
      this.sb.errorSnack('Please ensure all fields have a value!');
      return;
    }

    try {
      this.submitted = true;
      const formData = this.createStaffForm.value;
      await this.fires.FromCollection(this.fires.CollectionPaths.AllStaffMembers).Add(formData);
      await this.router.navigate(['main/staff/view']);
      this.submitted = false;
      this.sb.successSnack('Staff Member Added!');
    } catch (e) {
      console.log(e);
    }
  }

}
