import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AutoTableModule } from "ngx-auto-table";
import { MaterialModule } from "src/app/shared/material/material.module";
import { AddClientComponent } from "./add/add.component";
import { ViewClientComponent } from "./view/view.component";

const routes: Routes = [
    {
        path: 'view',
        component: ViewClientComponent,
    },
    {
        path: 'add',
        component: AddClientComponent,
    },
    {
        path: '',
        redirectTo: 'view',
        pathMatch: 'full',
    },
  ];

@NgModule({
    declarations: [AddClientComponent, ViewClientComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      MaterialModule,
      FormsModule,
      ReactiveFormsModule,
      AutoTableModule,
    ],
  })
  export class ClientModule {
    
  }
  