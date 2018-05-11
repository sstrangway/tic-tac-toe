import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  currentPlayerSubject = new Subject<string>();
  currentPlayer = 'X';
  isGameOver = false;

  sections = 
    ['_','_','_',
     '_','_','_',
     '_','_','_'];
              
  
  positionClasses = 
    ['top-left', 'top-middle', 'top-right',
     'left', 'middle', 'right',
     'bottom-left', 'bottom-middle', 'bottom-right'];

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.currentPlayerSubject.subscribe( (nextPlayer) => {
      this.currentPlayer = nextPlayer;
      if(this.currentPlayer === 'O'){
        //computer move
        let validMoves = [];
        for(let i = 0; i < this.sections.length; i ++){
          if(!(this.sections[i] === 'X' || this.sections[i] === 'O')){
            validMoves.push(i);
          }
        }
        let nextMove = validMoves[Math.floor( Math.random() * validMoves.length )] + ""
        console.log(validMoves);
        console.log(nextMove);
        this.onSectionClicked(nextMove);
      }
    });
  }

  onSectionClicked(index:string){
    if(!this.isGameOver && !(this.sections[index] === 'X' || this.sections[index] === 'O')){
      this.updateBoard(index);
      this.updateWinner();
      this.updateCurrentPlayer();
    }
  }

  updateBoard (index:string){
    this.sections[index] = this.currentPlayer;
  }

  updateWinner (){
    let condition0 = [this.sections[0], this.sections[1], this.sections[2]];
    let condition1 = [this.sections[3], this.sections[4], this.sections[5]];
    let condition2 = [this.sections[6], this.sections[7], this.sections[8]];

    let condition3 = [this.sections[0], this.sections[3], this.sections[6]];
    let condition4 = [this.sections[1], this.sections[4], this.sections[7]];
    let condition5 = [this.sections[2], this.sections[5], this.sections[8]];

    let condition6 = [this.sections[0], this.sections[4], this.sections[8]];
    let condition7 = [this.sections[6], this.sections[4], this.sections[2]];
    let conditions = [condition0, condition1, condition2, 
                      condition3, condition4, condition5,
                      condition6, condition7];

    for(let i = 0; i < conditions.length; i++){
      if(conditions[i].every( (character) => { return character === this.currentPlayer; })){
        this.isGameOver = true;
        break;
      }

    }
  }

  updateCurrentPlayer (){
    if(this.currentPlayer === 'X')
      this.currentPlayerSubject.next('O');
    else
      this.currentPlayerSubject.next('X');
  }

}
