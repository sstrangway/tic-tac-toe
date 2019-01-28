export class Player {
    constructor(
        public isComputer: boolean,
        public character: string,
        public gamesWon: number = 0,
        public gamesPlayed: number = 0,
        public gamesTied: number = 0
    ){}

}
