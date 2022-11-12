import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './domain/pages/home/home.component';
import { AboutComponent } from './domain/pages/about/about.component';
import { BlockComponent } from './domain/pages/block/block.component';
import { MobComponent } from './domain/pages/mob/mob.component';
import { ToolComponent } from './domain/pages/tool/tool.component';
import { BlockDetailComponent } from './domain/pages/block/detail/blockdetail.component';
import { BlockEditComponent } from './domain/pages/block/edit/blockedit.component';
import { BlockAddComponent } from './domain/pages/block/add/blockadd.component';

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
        children: [{ path: ':id', component: MobComponent }],
      },
      { path: 'tools', component: ToolComponent },
      {
        path: 'tools',
        children: [{ path: ':id', component: ToolComponent }],
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
