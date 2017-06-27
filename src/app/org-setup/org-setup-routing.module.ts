import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrgSetupComponent } from './org-setup.component';

const routes: Routes = [
    { path: '', component: OrgSetupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrgSetupRoutingModule { }
