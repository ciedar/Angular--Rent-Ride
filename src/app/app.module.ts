import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
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
import { FooterComponent } from './footer/footer.component';
import { ShowUserItemsComponent } from './user-cockpit/user-items-panel/show-user-items/show-user-items.component';
import { EditPasswordComponent } from './user-cockpit/edit-password/edit-password.component';
import { UserItemsPanelComponent } from './user-cockpit/user-items-panel/user-items-panel.component';
import { EditComponent } from './user-cockpit/user-items-panel/edit/edit.component';


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
    AddPostComponent,
    FooterComponent,
    ShowUserItemsComponent,
    EditPasswordComponent,
    UserItemsPanelComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRouteModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
