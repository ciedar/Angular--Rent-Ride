import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppRouteModule } from './app-route.module';
import { AuthComponent } from './auth/auth.component';
import { SearchComponent } from './search/search.component';
import { SearchListComponent } from './search/search-list/search-list.component';
import { SearchItemComponent } from './search/search-list/search-item/search-item.component';
import { UserCockpitComponent } from './user-cockpit/user-cockpit.component';
import { UserPanelComponent } from './user-cockpit/user-panel/user-panel.component';
import { AddPostComponent } from './user-cockpit/add-post/add-post.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AuthComponent,
    SearchComponent,
    SearchListComponent,
    SearchItemComponent,
    UserCockpitComponent,
    UserPanelComponent,
    AddPostComponent
  ],
  imports: [
    BrowserModule,
    AppRouteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
