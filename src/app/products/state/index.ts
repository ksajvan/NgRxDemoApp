
/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import { ProductState } from './product.reducer';

// Add piece of state by importing root state and adding Product piece of state to it
// We do this because of the lazy loading. We could not add ProductState to root state
export interface State extends fromRoot.State {
    products: ProductState;
}

// Moving selectors to index.ts (so called barrel) allows us to group selectors to one place and
// use them from barel - this will reduce amount of imported code (if we have selectors from multiple
// components in single barel, we import just index.ts file and nothing else)
// Barel works as a kind of public API for our modules

// Selectors:
// Create Feature Selector which grabs whole ProductState 
const getProductFeatureState = createFeatureSelector<ProductState>('products');

// Create selector for showProductCode piece of state of ProductState
export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

// Create selector for currentProduct piece of state of ProductState
export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
      if (currentProductId === 0) {
          return {
              id: 0,
              productName: '',
              productCode: 'New',
              description: '',
              starRating: 0
          }
      } else {
          return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
      }
  }  
);

// Create selector for products piece of state of ProductState
export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);

export const getError = createSelector(
    getProductFeatureState,
    state => state.error
)