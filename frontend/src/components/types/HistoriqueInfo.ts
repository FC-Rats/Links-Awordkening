export interface HistoriqueInfo {
    id: number;
    date: string;
    name_game: string;
    type : string;
    players : null | string[];
    score: number;
    givenwords : string[];
    outputwords : string[];
}