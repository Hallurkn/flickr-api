import { Photo } from './../../shared/types/photo';
import { ImageService } from './../../shared/services/image/image.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnDestroy {
  public isGrid = true;
  public searchQuery = '';
  public perPage = 24;
  public currentQuery: string;
  public photos: Photo[] = [];
  private photosub: Subscription = new Subscription();

  constructor(
    private imageService: ImageService
  ) { }

  searchHandler(query: string, perPage?: number) {
    const tag = getFirstWord(query);
    this.photosub = this.imageService.getImages(tag, perPage)
      .subscribe((res: Photo[]) => {
        this.photos = res;
        this.currentQuery = tag;
      }, error => {
        this.currentQuery = '';
        console.error(error);
      });
  }

  clearHandler() {
    this.currentQuery = '';
    this.photos = [];
  }

  ngOnDestroy(): void {
    this.photosub.unsubscribe();
  }
}

const getFirstWord = (str) => {
  const spacePosition = str.indexOf(' ');
  if (spacePosition === -1) {
    return str;
  } else {
    return str.substr(0, spacePosition);
  }
};
