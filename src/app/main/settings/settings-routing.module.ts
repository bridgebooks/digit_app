import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { OrgProfileComponent } from './org-profile/org-profile.component';


const routes: Routes = [
    { path: '', component: SettingsComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'account', component: AccountComponent },
    { path: 'org', component: OrgProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
