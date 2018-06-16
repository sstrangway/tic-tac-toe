import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { SectionComponent } from './game-board/section/section.component';
import { ComputerService } from './services/computer.service';

import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: ':gameType', component: GameBoardComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GameBoardComponent,
    SectionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ComputerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
