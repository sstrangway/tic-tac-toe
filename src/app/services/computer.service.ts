import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';


@Injectable()
export class ComputerService {

  constructor() { }

  getMove(board: string[]){
    let validMoves = [];
    for(let i = 0; i < board.length; i ++){
      if(!(board[i] === 'X' || board[i] === 'O')){
        validMoves.push(i);
      }
    }
    return validMoves[Math.floor( Math.random() * validMoves.length )];
  
  }

  async train(gameLog: any) {
    console.log(gameLog);
    // todo
  }

  predict(val) {
    // todo
  }
}
