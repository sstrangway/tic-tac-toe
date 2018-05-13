import { Subject } from "rxjs/Subject";

export class Board {
    sections = [
        '_','_','_',
        '_','_','_',
        '_','_','_'];
    
    currentPlayerSubject = new Subject<string>();
    isGameOver: Boolean;
    
}   
