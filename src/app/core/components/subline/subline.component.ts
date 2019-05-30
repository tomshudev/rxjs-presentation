import { Component, OnInit, Input } from '@angular/core';
import { text } from '@angular/core/src/render3';

@Component({
  selector: 'app-subline',
  templateUrl: './subline.component.html',
  styleUrls: ['./subline.component.scss']
})
export class SublineComponent implements OnInit {

  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

}
