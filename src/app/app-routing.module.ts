import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './domain/pages/home/home.component';
import { AboutComponent } from './domain/pages/about/about.component';
import { BlockComponent } from './domain/pages/block/list/block.component';
import { MobComponent } from './domain/pages/mob/list/mob.component';
import { ToolComponent } from './domain/pages/tool/list/tool.component';
import { BlockDetailComponent } from './domain/pages/block/detail/blockdetail.component';
import { BlockEditComponent } from './domain/pages/block/edit/blockedit.component';
import { BlockAddComponent } from './domain/pages/block/add/blockadd.component';
import { HomeAddComponent } from './domain/pages/home/add/homeadd.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserComponent } from './domain/pages/user/list/user.component';
import { UserDetailComponent } from './domain/pages/user/detail/userdetail.component';
import { UserEditComponent } from './domain/pages/user/edit/useredit.component';
import { ToolEditComponent } from './domain/pages/tool/edit/tooledit.component';
import { ToolDetailComponent } from './domain/pages/tool/detail/tooldetail.component';
import { ToolAddComponent } from './domain/pages/tool/add/tooladd.component';
import { MobDetailComponent } from './domain/pages/mob/detail/mobdetail.component';
import { MobAddComponent } from './domain/pages/mob/add/mobadd.component';
import { MobEditComponent } from './domain/pages/mob/edit/mobedit.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'home',
        children: [{ path: 'add', component: HomeAddComponent }],
      },
      { path: 'about', component: AboutComponent },
      { path: 'blocks', component: BlockComponent },
      {
        path: 'blocks',
        children: [
          { path: 'add', component: BlockAddComponent },
          { path: ':id', component: BlockDetailComponent },
          { path: ':id/edit', component: BlockEditComponent },
        ],
      },
      { path: 'mobs', component: MobComponent },
      {
        path: 'mobs',
        children: [
          { path: 'add', component: MobAddComponent },
          { path: ':id', component: MobDetailComponent },
          { path: ':id/edit', component: MobEditComponent },
        ],
      },
      { path: 'tools', component: ToolComponent },
      {
        path: 'tools',
        children: [
          { path: 'add', component: ToolAddComponent },
          { path: ':id', component: ToolDetailComponent },
          { path: ':id/edit', component: ToolEditComponent },
        ],
      },
      {
        path: 'users',
        component: UserComponent,
      },
      {
        path: 'users',
        children: [
          { path: ':id', component: UserDetailComponent },
          { path: ':id/edit', component: UserEditComponent },
        ],
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
