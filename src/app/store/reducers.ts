import { createReducer, on } from "@ngrx/store";
import { PersonState } from "../types/person-state";
import * as PersonActions from "./action";

export const initialState: PersonState = {
    isLoading: false,
    data: [],
    error: null,
    
}

export const reducers = createReducer(
    initialState,
    on(PersonActions.getPerson, (state)=> ({
        ...state, isLoading: true
    }))
)