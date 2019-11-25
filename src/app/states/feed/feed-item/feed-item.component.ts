import { Component, OnInit, Input } from '@angular/core';
import { Photo } from 'src/app/shared/types/photo';

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.scss']
})
export class FeedItemComponent implements OnInit {
  @Input() photo: Photo;
  constructor() { }

  ngOnInit() {
  }

}
