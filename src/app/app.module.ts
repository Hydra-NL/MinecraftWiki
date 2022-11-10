import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './navbar/nav.component';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './domain/pages/home/home.component';
import { AboutComponent } from './domain/pages/about/about.component';
import { BlockComponent } from './domain/pages/block/block.component';
import { MobComponent } from './domain/pages/mob/mob.component';
import { ToolComponent } from './domain/pages/tool/tool.component';
import { BlockDetailComponent } from './domain/pages/block/blockdetail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LayoutComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    BlockComponent,
    MobComponent,
    ToolComponent,
    BlockDetailComponent,
  ],
  imports: [AppRoutingModule, NgbModule, RouterModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
