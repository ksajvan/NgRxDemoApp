import { Routes, RouterModule } from "@angular/router";
import { ProductShellComponent } from './containers/product-shell/product-shell.component';
import { NgModule } from '@angular/core';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './state/product.effects';

const productRoutes: Routes = [
    { path: '', component: ProductShellComponent }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(productRoutes),
        StoreModule.forFeature('products', reducer),
        EffectsModule.forFeature([ProductEffects]),
    ],
    declarations: [
        ProductShellComponent,
        ProductListComponent,
        ProductEditComponent
    ]
})
export class ProductModule { }
