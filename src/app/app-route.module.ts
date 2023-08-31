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
import { ShowUserItemsComponent } from "./user-cockpit/show-user-items/show-user-items.component";



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
        path: 'user-panel', component: UserCockpitComponent, children: [
            { path: 'add', component: AddPostComponent },
            { path: 'messages', component: MessagesComponent },
            { path: 'password-edit', component: EditPasswordComponent },
            { path: 'show-user-items', component: ShowUserItemsComponent }
        ]
    }
]



@NgModule({

    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRouteModule {

}