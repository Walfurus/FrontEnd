import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs';
import { Staff } from 'src/app/models';
import { FireStateFacade } from 'src/app/services/firecache.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditStaffComponent implements OnInit {
  staff$: Staff;

  editStaffForm!: FormGroup;
  constructor(
    private fires: FireStateFacade,
    private router: Router,
    private sb: SnackbarService,
    private ss: StaffService,
  ) { }

  async ngOnInit(): Promise<void> {
    console.log('WE ARE VIEWING', this.ss.currentStaffId);
    const staffId = this.ss.currentStaffId;
    if (!staffId) {
      // no staff
      this.router.navigate([`main/staff/view`]);
    }
    this.staff$ = await this.fires.FromCollection(this.fires.CollectionPaths.AllStaffMembers).promise.GetId(staffId);
    this.editStaffForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    // console.l
    this.editStaffForm.get('name')?.patchValue(this.staff$.name);
    this.editStaffForm.get('email')?.patchValue(this.staff$.email);
  }

  async updateStaffData() {
    if (!this.editStaffForm.valid) {
      console.log('Form not valid');
      this.sb.errorSnack('Please ensure all fields have a value!');
      return;
    }
    
    try {
      const formData = this.editStaffForm.value;
      await this.fires.FromCollection(this.fires.CollectionPaths.AllStaffMembers).Update(this.ss.currentStaffId, formData, false);
      await this.router.navigate(['main/staff/view']);
      this.sb.successSnack('Staff Member Added!');
    } catch (e) {
      throw e;
    }
  }

}
