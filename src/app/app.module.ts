import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavComponent } from './navbar/nav.component';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './domain/pages/home/home.component';
import { HomeAddComponent } from './domain/pages/home/add/homeadd.component';
import { AboutComponent } from './domain/pages/about/about.component';
import { BlockComponent } from './domain/pages/block/list/block.component';
import { MobComponent } from './domain/pages/mob/list/mob.component';
import { ToolComponent } from './domain/pages/tool/list/tool.component';
import { BlockDetailComponent } from './domain/pages/block/detail/blockdetail.component';
import { BlockEditComponent } from './domain/pages/block/edit/blockedit.component';
import { BlockAddComponent } from './domain/pages/block/add/blockadd.component';
import { BiomeAddComponent } from './domain/pages/biome/add/biomeadd.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserComponent } from './domain/pages/user/list/user.component';
import { UserDetailComponent } from './domain/pages/user/detail/userdetail.component';
import { UserEditComponent } from './domain/pages/user/edit/useredit.component';
import { ToolEditComponent } from './domain/pages/tool/edit/tooledit.component';
import { ToolDetailComponent } from './domain/pages/tool/detail/tooldetail.component';
import { ToolAddComponent } from './domain/pages/tool/add/tooladd.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LayoutComponent,
    FooterComponent,
    HomeComponent,
    HomeAddComponent,
    AboutComponent,
    BlockComponent,
    MobComponent,
    ToolComponent,
    BlockDetailComponent,
    BlockEditComponent,
    BlockAddComponent,
    BiomeAddComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    UserDetailComponent,
    UserEditComponent,
    ToolEditComponent,
    ToolDetailComponent,
    ToolAddComponent,
  ],
  imports: [
    AppRoutingModule,
    NgbModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
