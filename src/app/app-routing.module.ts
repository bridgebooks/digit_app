import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared';

const appRoutes: Routes = [
  {
      path: '',
      loadChildren: './main/main.module#MainModule',
      canActivate: [AuthGuard]
  },
  {
    path: 'invoice-viewer',
    loadChildren: './invoice-viewer/invoice-viewer.module#InvoiceViewerModule'
  },
  {
      path: 'login',
      loadChildren: './login/login.module#LoginModule',
      data: {
        title: 'Login - Bridge Books'
      }
  },
  {
    path: 'signup',
    loadChildren: './signup/signup.module#SignupModule',
    data: {
      title: 'Sign Up - Bridge Books'
    }
  },
  {
    path: 'password/reset',
    loadChildren: './password-reset/password-reset.module#PasswordResetModule',
    data: {
      title: 'Forgot Password - Bridge Books'
    }
  },
  {
    path: 'password/create',
    loadChildren: './password-create/password-create.module#PasswordCreateModule',
    data: {
      title: 'Change Password - Bridge Books'
    }
  },
  {
    path: 'setup',
    loadChildren: './org-setup/org-setup.module#OrgSetupModule',
    canActivate: [AuthGuard],
    data: {
      title: 'Setup your organisation - Bridge Books'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
