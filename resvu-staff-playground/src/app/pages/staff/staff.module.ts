import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewStaffComponent } from './view/view.component';
import { RouterModule, Routes } from '@angular/router';
import { AddStaffComponent } from './add/add.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoTableModule } from 'ngx-auto-table';
import { EditStaffComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: 'view',
    component: ViewStaffComponent,
  },
  {
    path: 'add',
    component: AddStaffComponent,
  },
  {
    path: 'edit',
    component: EditStaffComponent,
  },
  { path: '', redirectTo: 'view', pathMatch: 'full' },
];

@NgModule({
  declarations: [ViewStaffComponent, AddStaffComponent, EditStaffComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AutoTableModule,
  ],
})
export class StaffModule { }
