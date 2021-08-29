import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, private aRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    // const id = +this.aRoute.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);
    // this.aRoute.params.subscribe(
    //   (params: Params) => {
    //     this.server = this.serversService.getServer(+params['id']);
    //   }
    // );

    this.aRoute.data.subscribe(
      (data: Data) => {
        this.server = data['server'];
      }
    );
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.aRoute, queryParamsHandling: 'preserve'});
  }
}
