import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ComputerService } from '../services/computer.service';
import { Board } from '../models/board.model';
import { Player } from '../models/player.model';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'q';
import { containsTree } from '@angular/router/src/url_tree';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit, OnDestroy {
  
  ngOnDestroy() {
    this.currentPlayerSubject.unsubscribe();
  }

  winningCondition;
  board: Board;
  player0: Player;
  player1: Player;
  gameType: string;
  isTraining = false;
  gameDelay = 500;

  currentPlayerSubject = new Subject<Player>();
  currentPlayer: Player;
  isGameOver = false;

  sections = 
    ['_','_','_',
     '_','_','_',
     '_','_','_'];
              
  gameLog = [];

  positionClasses = ['','','','','','','','',''];
     
  borderClasses = 
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
        }, this.gameDelay);
      }
    });

    if(this.gameType === 'VS-COMPUTER') {
      this.isTraining = false;
      this.gameDelay = 500;
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
      this.isTraining = false;
      this.gameDelay = 500;
      this.player0 = new Player(false, 'X');
      this.player1 = new Player(false, 'O');
    }

    if(this.gameType === 'COMPUTER-VS-COMPUTER') {
      this.isTraining = true;
      this.gameDelay = 50;
      this.player0 = new Player(true, 'X');
      this.player1 = new Player(true, 'O');
    }

    this.startGame();
  }

  startGame(){

    let player1IsComputer = Math.floor(Math.random() * Math.floor(2));
    if(player1IsComputer === 1){
      this.currentPlayerSubject.next(this.player1);
    } else {
      this.currentPlayerSubject.next(this.player0);
    }
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
    this.gameLog.push(this.sections.toString());
  }

  updateWinner (){

    let condition0 = [0, 1, 2];
    let condition1 = [3, 4, 5];
    let condition2 = [6, 7, 8];

    let condition3 = [0, 3, 6];
    let condition4 = [1, 4, 7];
    let condition5 = [2, 5, 8];

    let condition6 = [0, 4, 8];
    let condition7 = [6, 4, 2];
    let conditions = [condition0, condition1, condition2, 
                      condition3, condition4, condition5,
                      condition6, condition7];

    for(let i = 0; i < conditions.length; i++){
      if(conditions[i].every( (index) => { return this.sections[index] === this.currentPlayer.character; })){
        this.isGameOver = true;
        this.winningCondition = conditions[i];
        this.player0.gamesPlayed ++;
        this.player1.gamesPlayed ++;
        if(this.currentPlayer == this.player0){
          this.player0.gamesWon ++;
          console.table(this.player0);
        } else {
          this.player1.gamesWon ++;
          console.table(this.player1);
        }
        break;
      }
    }
    if(this.sections.indexOf('_') < 0 ){
      this.isGameOver = true;
      this.player0.gamesPlayed ++;
      this.player1.gamesPlayed ++;
      this.player0.gamesTied ++;
      this.player1.gamesTied ++;
    }


    if(this.isGameOver){
      //console.log(this.gameLog);
      if(this.gameType === 'COMPUTER-VS-COMPUTER') {
        this.onReset();
      } else {
        this.hideLosingTiles();
      }
    }
  }

  async hideLosingTiles(){
    let randIndex = this.sections.map( (character, index) => {
      if(!(character === '_')){
          return index;
        }
      })
      .filter( (index) => {
          return index !== undefined
      })
      .map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);

    await delay(1000);
    while(randIndex.length > 0 ){
      let index = randIndex.pop();
      if( !(this.winningCondition.indexOf(index) > -1) ){
          this.positionClasses[index] += " offScreen";
      }
      await delay(100);
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
    this.gameLog = [];
    setTimeout( ()=>{
      this.borderClasses = 
      ['top-left', 'top-middle', 'top-right',
       'left', 'middle', 'right',
       'bottom-left', 'bottom-middle', 'bottom-right'];

      this.sections = 
      ['_','_','_',
       '_','_','_',
       '_','_','_'] ;
        }, 1); 

      this.positionClasses = ['','','','','','','','',''];

     this.startGame();
    } 

    trackByPosition(position: number){
      return position;
    }


}
