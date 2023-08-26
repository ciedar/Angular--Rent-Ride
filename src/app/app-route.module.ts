import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core"
import { HomeComponent } from "./home/home.component";
import { AuthComponent } from "./auth/auth.component";
import { SearchComponent } from "./search/search.component";
import { SearchListComponent } from "./search/search-list/search-list.component";
import { SearchItemComponent } from "./search/search-list/search-item/search-item.component";



const appRoutes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'auth', component: AuthComponent },
    {
        path: 'search', component: SearchComponent, children: [
            { path: '', component: SearchListComponent },
            { path: ':id', component: SearchItemComponent }
        ]
    }
]



@NgModule({

    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRouteModule {

}