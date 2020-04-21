import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/user.reducer';

const userRoutes: Routes = [
    { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(userRoutes),
        StoreModule.forFeature('users', reducer)
    ],
    declarations: [
        LoginComponent
    ]
})
export class UserModule { }