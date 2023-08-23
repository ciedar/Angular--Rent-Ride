import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core"
import { HomeComponent } from "./home/home.component";
import { AuthComponent } from "./auth/auth.component";


const appRoutes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'auth', component: AuthComponent }
]



@NgModule({

    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRouteModule {

}