import { ServerResolverService } from './servers/server/server-resolver.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthGuardService } from './auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNoteFoundComponent } from './page-note-found/page-note-found.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';

const appRoutes: Routes = [
  {path: "users", component: UsersComponent, children: [
    {path: ":id/:name", component: UserComponent}
  ]},
  {path: "servers",
  // canActivate: [AuthGuardService],
  canActivateChild: [AuthGuardService],
  component: ServersComponent,
  children: [
    {path: ":id", component: ServerComponent, resolve: {server: ServerResolverService}},
    {path: ":id/edit", component: EditServerComponent, canDeactivate: [CanDeactivateGuard]}
  ]},
  {path: "", component: HomeComponent},
  // {path: 'droids', component: PageNoteFoundComponent},
  {path: 'droids', component: ErrorPageComponent, data: {message: 'This aint it chief...'}},
  {path: '**', redirectTo: 'droids'}
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true}),
    RouterModule.forRoot(appRoutes, {useHash: false})
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}
