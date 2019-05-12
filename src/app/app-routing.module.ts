import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'requests', pathMatch: 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  {
    path: 'requests',
    loadChildren: './requests/requests.module#RequestsPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'about',
    loadChildren: './about/about.module#AboutPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'manage-users',
    loadChildren: './manage-users/manage-users.module#ManageUsersPageModule'
  },
  {
    path: 'assign-rooms',
    loadChildren: './assign-rooms/assign-rooms.module#AssignRoomsPageModule',
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
