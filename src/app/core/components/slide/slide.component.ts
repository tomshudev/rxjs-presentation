import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
  animations: [
    trigger('slideRight', [
      // cubic-bezier for a tiny bouncing feel
      transition('* => right', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateX(0%)', opacity: 1 }))
      ]),
      transition('* => left', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '500ms',
          style({
            transform: 'translateX(0%)',
            opacity: 1
          })
        )
      ])
    ])
  ]
})
export class SlideComponent implements OnInit {
  @Input() orientation: string;

  constructor() {}

  ngOnInit() {
    console.log(this.orientation);
  }
}
