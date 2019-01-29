import { Subject } from 'rxjs';

export class Board {
    sections = [
        '_','_','_',
        '_','_','_',
        '_','_','_'];
    
    currentPlayerSubject = new Subject<string>();
    isGameOver: Boolean;
    
}   
