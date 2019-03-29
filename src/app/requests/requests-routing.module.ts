import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestsPage } from './requests.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: RequestsPage,
        children: [
            {
                path: 'add-requests',
                children: [
                    {
                        path: '',
                        loadChildren: './add-requests/add-requests.module#AddRequestsPageModule'
                    }
                ]
            },
            {
                path: 'my-requests',
                children: [
                    {
                        path: '',
                        loadChildren: './my-requests/my-requests.module#MyRequestsPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/requests/tabs/add-requests',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/requests/tabs/add-requests',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})


export class RequestsRoutingModule {}
