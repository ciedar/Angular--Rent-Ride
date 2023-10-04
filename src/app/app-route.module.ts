import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core"
import { HomeComponent } from "./home/home.component";
import { AuthComponent } from "./auth/auth.component";
import { SearchComponent } from "./search/search.component";
import { SearchListComponent } from "./search/search-list/search-list.component";
import { SearchItemComponent } from "./search/search-list/search-item/search-item.component";
import { UserCockpitComponent } from "./user-cockpit/user-cockpit.component";
import { AddPostComponent } from "./user-cockpit/add-post/add-post.component";
import { MessagesComponent } from "./user-cockpit/messages/messages.component";
import { EditPasswordComponent } from "./user-cockpit/edit-password/edit-password.component";
import { ShowUserItemsComponent } from "./user-cockpit/user-items-panel/show-user-items/show-user-items.component";
import { UserItemsPanelComponent } from "./user-cockpit/user-items-panel/user-items-panel.component";
import { EditComponent } from "./user-cockpit/user-items-panel/edit/edit.component";
import { ShowUserFavouriteComponent } from "./user-cockpit/user-favourite-panel/show-user-favourite/show-user-favourite.component";
import { UserFavouritePanelComponent } from "./user-cockpit/user-favourite-panel/user-favourite-panel.component";
import { FavouriteItemComponent } from "./user-cockpit/user-favourite-panel/favourite-item/favourite-item.component";
import { UsersListPanelComponent } from "./users-list-panel/users-list-panel.component";
import { UsersListComponent } from "./users-list-panel/users-list/users-list.component";
import { UserProfileComponent } from "./users-list-panel/users-list/user-profile/user-profile.component";
import { MessagesListComponent } from "./user-cockpit/messages/messages-list/messages-list.component";
import { NewMessageComponent } from "./user-cockpit/messages/new-message/new-message.component";




const appRoutes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'auth', component: AuthComponent },
    {
        path: 'search', component: SearchComponent, children: [
            { path: '', component: SearchListComponent },
            { path: ':id', component: SearchItemComponent }
        ]
    },
    {
        path: 'users-list', component: UsersListPanelComponent, children: [
            { path: '', component: UsersListComponent },
            { path: ':id', component: UserProfileComponent }
        ]
    },
    {
        path: 'user-panel', component: UserCockpitComponent, children: [
            {
                path: 'messages', component: MessagesComponent, children: [
                    { path: '', component: MessagesListComponent },
                    { path: 'new-message', component: NewMessageComponent }
                ]
            },
            { path: 'add', component: AddPostComponent },
            { path: 'password-edit', component: EditPasswordComponent },
            {
                path: 'user-items-panel', component: UserItemsPanelComponent, children: [
                    { path: '', component: ShowUserItemsComponent },
                    { path: 'edit/:index', component: EditComponent }
                ]
            },
            {
                path: 'user-favourite-panel', component: UserFavouritePanelComponent, children: [
                    { path: '', component: ShowUserFavouriteComponent },
                    { path: ':id', component: FavouriteItemComponent }
                ]
            }
        ]
    }
]



@NgModule({

    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRouteModule {

}