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
    path: 'add-user',
    loadChildren: './add-user/add-user.module#AddUserPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'manage-users',
    loadChildren: './manage-users/manage-users.module#ManageUsersPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
