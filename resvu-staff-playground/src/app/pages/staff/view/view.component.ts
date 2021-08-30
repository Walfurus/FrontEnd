import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutoTableConfig } from 'ngx-auto-table';
import { Observable } from 'rxjs';
import { Staff } from 'src/app/models';
import { FireStateFacade } from 'src/app/services/firecache.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StaffService } from 'src/app/services/staff.service';




@Component({
  selector: 'app-view-staff',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewStaffComponent implements OnInit {
  staff$: Observable<Staff[]>;
  config: AutoTableConfig<Staff>;

  constructor(
    private fires: FireStateFacade,
    private router: Router,
    private sb: SnackbarService,
    private ss: StaffService
  ) { }

  ngOnInit(): void {
    this.staff$ = this.fires.FromCollection(this.fires.CollectionPaths.AllStaffMembers).GetAllDocsSnap<Staff>();
    this.config = {
      data$:  this.staff$,
      actionsVisibleCount: 1,
      actionsBulk: [
        {
          label: 'Delete',
          icon: 'delete',
          onClick: async (s: Staff[]) => {
            console.log('About to delete', s);
            await this.onDeleteStaffBulk(s)
          }
        }
      ],
      actions: [
        {
          label: 'Delete',
          icon: 'delete',
          onClick: async (s: Staff) => {
            await this.onDeleteStaff(s)
          }
        },
        {
          label: 'Edit',
          icon: 'edit',
          onClick: async (s: Staff) => {
            await this.onEditStaff(s)
          }
        }
      ]
    };
  }


  async onDeleteStaff(s: Staff) {
    await this.fires.FromCollection(this.fires.CollectionPaths.AllStaffMembers).DeleteId(s.id as string);
    this.sb.successSnack('Staff Member Deleted');
  }

  async onEditStaff(s: Staff) {
    this.sb.successSnack('Staff Member Edited');
    this.ss.currentStaffId = s.id;
    this.router.navigate([`main/staff/edit`])
  }

  async onDeleteStaffBulk(s: Staff[]) {
    await Promise.all(s.map(async staff => {
      await this.fires.FromCollection(this.fires.CollectionPaths.AllStaffMembers).DeleteId(staff.id as string);
    }));
    this.sb.successSnack(`${s.length} Staff Members Deleted!`)
  }

  async routeToAddStaff() {
    await this.router.navigate(['main/staff/add'])
  }

  

}
