import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GameService {
  
  public sectionSubject = new Subject<any>();
  constructor() { }

  onSectionClicked(index: string, character: string){
    let pos =  {"index":index, "character": character};
    this.sectionSubject.next(pos);
  }

}
