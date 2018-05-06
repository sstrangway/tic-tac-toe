import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  @Input() position: number; 
  position_class: string;
  character = '_';
  position_classes = ['top-left', 'top-middle', 'top-right',
                      'left', 'middle', 'right',
                      'bottom-left', 'bottom-middle', 'bottom-right'];
  constructor() { }

  ngOnInit() {
    this.position_class = this.position_classes[this.position];
  }

  onSectionClick(character:string){
    this.character = character
  }

}
