import { Person } from "../app.component";
import { PersonInterface } from "../person/person";

export interface PersonState {
    isLoading: boolean;
    data: PersonInterface[];
    error: string | null;
}
