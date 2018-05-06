import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GameService {

  private onSectionEmit = new Subject<any>();
  constructor() { }

  onSectionClicked(index: number, character: string){

   // this.onSectionClicked.next({'index':index, 'character':character});
  }

}
