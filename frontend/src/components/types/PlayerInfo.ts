export interface PlayerInfo {
    player_id: number,
    player_name: string;
    player_score: number; //Rank est calculé à partir du score
    player_url: string;
    player_isHost: boolean;
    player_remainingTurns : number;
}