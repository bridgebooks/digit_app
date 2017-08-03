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
      path: 'login',
      loadChildren: './login/login.module#LoginModule',
      data: {
        title: 'Login - ZenBooks'
      }
  },
  {
    path: 'signup',
    loadChildren: './signup/signup.module#SignupModule',
    data: {
      title: 'Sign Up - ZenBooks'
    }
  },
  {
    path: 'password/reset',
    loadChildren: './password-reset/password-reset.module#PasswordResetModule',
    data: {
      title: 'Forgot Password - ZenBooks'
    }
  },
  {
    path: 'password/create',
    loadChildren: './password-create/password-create.module#PasswordCreateModule',
    data: {
      title: 'Change Password - ZenBooks'
    }
  },
  {
    path: 'setup',
    loadChildren: './org-setup/org-setup.module#OrgSetupModule',
    canActivate: [AuthGuard],
    data: {
      title: 'Setup your organisation - ZenBooks'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
