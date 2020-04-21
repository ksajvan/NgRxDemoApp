import * as fromRoot from '../../state/app.state';
import { User } from '../user';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActions, UserActionTypes } from './user.actions';

// Add piece of state by importing root state and adding User piece of state to it
// We do this because of the lazy loading. We could not add UserState to root state
export interface State extends fromRoot.State {
    users: UserState
}

// Define UserState as piece of state for User
export interface UserState {
    maskUserName: boolean;
    currentUser: User;
}

// Initialize UserState to default values
const initialState: UserState = {
    maskUserName: true,
    currentUser: null
};

// Selectors:

// Create Feature Selector which grabs whole UserState 
const getUserFeatureState = createFeatureSelector<UserState>('users');

// Create selector for maskUserName piece of state of UserState
export const getMaskUserName = createSelector(
    getUserFeatureState,
    state => state.maskUserName
);

// Create selector for currentUser piece of state of UserState
export const getCurrentUser = createSelector(
    getUserFeatureState,
    state => state.currentUser
);

export function reducer(state = initialState, action: UserActions) {

    switch (action.type) {
        case UserActionTypes.MaskUserName:
            return {
             ...state,
             maskUserName: action.payload
            };
    
        default:
            return state;
    }
}