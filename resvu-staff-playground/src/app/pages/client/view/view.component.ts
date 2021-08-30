import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutoTableConfig } from 'ngx-auto-table';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models';
import { FireStateFacade } from 'src/app/services/firecache.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-view-client',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewClientComponent implements OnInit {
  clients: Observable<Client[]>;
  config: AutoTableConfig<Client>;

  constructor(
    private fires: FireStateFacade,
    private router: Router,
    private sb: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.clients = this.fires.FromCollection(this.fires.CollectionPaths.AllStaffMembers).GetAllDocsSnap<Client>();
    this.config = {
      data$: this.clients,
      actionsVisibleCount: 1,
      actionsBulk: [
        {
          label: 'Delete',
          icon: 'delete',
          onClick: async (c: Client[]) => {
            await this.onDeleteClientBulk(c);
          }
        }
      ],
      actions: [
        {
          label: 'Delete',
          icon: 'delete',
          onClick: async (c: Client) => {
            await this.onDeleteClient(c);
          }
        }
      ],
    };
  }

  async onDeleteClientBulk(c: Client[]) {
    await Promise.all(c.map(async client => {
      await this.fires.FromCollection(this.fires.CollectionPaths.AllStaffMembers).DeleteId(client.id as string);
    }));
  }

  async onDeleteClient(c: Client) {
    await this.fires.FromCollection(this.fires.CollectionPaths.AllClientMembers).DeleteId(c.id as string);
  }

  async routeToAddClient() {
    await this.router.navigate(['main/client/add']);
  }

}
