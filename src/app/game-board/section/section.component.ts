import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  @Input() position: number; 
  @Input() character: string;
  @Input() positionClass: string;
  @Input() borderClass: string;

  constructor() { 

  }

  ngOnInit() {}

}
