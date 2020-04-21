import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as productActions from './product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Product } from '../product';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class ProductEffects {

    constructor(private actions$: Actions,
        private productService: ProductService) { }

    @Effect()
    loadProducts$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.Load),
        mergeMap((action: productActions.Load) => this.productService.getProducts().pipe(
            map((products: Product[]) => (new productActions.LoadSuccess(products))),
            catchError(err => of(new productActions.LoadFail(err)))
        ))
    );

    @Effect()
    updateProduct$: Observable<Action> = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.UpdateProduct), // here we catch appropriate Action type
        map((action: productActions.UpdateProduct) => action.payload), // when it receives action, it maps the action to pull of payload
        mergeMap((product: Product) => // updateProduct returns Observable, so we use mergeMap to flatten two observables
            this.productService.updateProduct(product).pipe( // then we call the product service updateProduct and pass product to be updated
                map(updatedProduct => (new productActions.UpdateProductSuccess(updatedProduct))), // handle updatePRoduct success
                catchError(err => of(new productActions.UpdateProductFail(err))) // handle updateProduct fail
            )
        )
    );

    @Effect()
    createProduct$: Observable<Action> = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.CreateProduct),
        map((action: productActions.CreateProduct) => action.payload),
        mergeMap((product: Product) => 
            this.productService.createProduct(product).pipe(
                map(createdProduct => (new productActions.CreateProductSuccess(createdProduct))),
                catchError(err => of(new productActions.CreateProductFail(err)))
            )
        )
    );

    @Effect()
    deleteProduct$: Observable<Action> = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.DeleteProduct),
        map((action: productActions.DeleteProduct) => action.payload),
        mergeMap((productId: number) => 
            this.productService.deleteProduct(productId).pipe(
                map(() => (new productActions.DeleteProductSuccess(productId))),
                catchError(err => of (new productActions.DeleteProductFail(err)))
            )
        )
    );
}