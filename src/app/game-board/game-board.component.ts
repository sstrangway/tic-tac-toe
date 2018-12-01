import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ComputerService } from '../services/computer.service';
import { Board } from '../models/board.model';
import { Player } from '../models/player.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  winningCondition;
  board: Board;
  player0: Player;
  player1: Player;
  gameType: string;

  currentPlayerSubject = new Subject<Player>();
  currentPlayer: Player;
  isGameOver = false;

  sections = 
    ['_','_','_',
     '_','_','_',
     '_','_','_'];
              
  
  positionClasses = 
    ['top-left', 'top-middle', 'top-right',
     'left', 'middle', 'right',
     'bottom-left', 'bottom-middle', 'bottom-right'];

  constructor(
    private computerService: ComputerService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

  this.activatedRoute.params.subscribe(paramsId => {
    this.gameType = paramsId.gameType;
    this.onReset();
  });


    this.currentPlayerSubject.subscribe( (nextPlayer) => {
      this.currentPlayer = nextPlayer;
      if(this.currentPlayer.isComputer){
        let nextMove = this.computerService.getMove(this.sections);
        setTimeout( ()=>{
          this.onSectionClicked(nextMove, true);
        }, 500);
      }
    });

    this.startGame();
  }

  startGame(){

    if(this.gameType === 'VS-COMPUTER') {
      let player1IsComputer = Math.floor(Math.random() * Math.floor(2));
      if(player1IsComputer == 1){
        this.player0 = new Player(true, 'X');
        this.player1 = new Player(false, 'O');
      } else {
        this.player0 = new Player(true, 'X');
        this.player1 = new Player(false, 'O');
      }
    }

    if(this.gameType === 'VS-HUMAN') {
        this.player0 = new Player(false, 'X');
        this.player1 = new Player(false, 'O');
    }

    if(this.gameType === 'COMPUTER-VS-COMPUTER') {
      this.player0 = new Player(true, 'X');
      this.player1 = new Player(true, 'O');
    }
   
    this.currentPlayerSubject.next(this.player0);
  }

  onSectionClicked(index:number, isComputer: boolean){ 
    if(isComputer == this.currentPlayer.isComputer &&  !this.isGameOver && !(this.sections[index] === 'X' || this.sections[index] === 'O')){
      this.updateBoard(index);
      this.updateWinner();
      this.updateCurrentPlayer();
    }
  }

  updateBoard (index:number){
    this.sections[index] = this.currentPlayer.character;
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
      if(conditions[i].every( (character) => { return character === this.currentPlayer.character; })){
        this.isGameOver = true;
        this.winningCondition = conditions[i];
        break;
      }
    }


  }

  updateCurrentPlayer (){
    if(this.currentPlayer == this.player0)
      this.currentPlayerSubject.next(this.player1);
    else
      this.currentPlayerSubject.next(this.player0);
  }

  onReset(){
    this.isGameOver = false;
    this.sections = [];
    setTimeout( ()=>{
      this.sections = 
      ['_','_','_',
       '_','_','_',
       '_','_','_'] ;
        }, 1); 
     this.startGame();
    } 

    trackByPosition(position: number){
      return position;
    }
}
