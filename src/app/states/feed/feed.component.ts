import { listAnimation } from './feed.animations';
import { Photo } from './../../shared/types/photo';
import { ImageService } from './../../shared/services/image/image.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  animations: [listAnimation]
})
export class FeedComponent implements OnDestroy {
  public isGrid = true;
  public searchQuery = '';
  public perPage = 24;
  private page = 1;
  public currentQuery: string;
  public photos: Photo[] = [];
  public total: number;
  public loading: boolean;

  private photosub: Subscription = new Subscription();

  constructor(
    private imageService: ImageService
  ) { }

  searchHandler(searchQuery: string, perPage?: number) {
    this.loading = true;
    const tag = getFirstWord(searchQuery);
    this.page = 1;
    this.photosub = this.imageService.getImages(tag, perPage)
      .subscribe((res: {
        total: number;
        photos: Photo[];
      }) => {
        this.total = res.total;
        this.photos = res.photos;
        this.currentQuery = tag;
        this.loading = false;
      }, error => {
        this.currentQuery = '';
        this.loading = false;
        console.error(error);
      });
  }

  clearHandler() {
    this.photos = [];
    this.currentQuery = '';
  }

  loadMore(searchQuery: string, perPage?: number) {
    this.loading = true;
    this.page++;
    this.imageService.getImages(searchQuery, perPage, this.page)
      .subscribe((res: {
        total: number;
        photos: Photo[];
      }) => {
        this.photos = [...this.photos, ...res.photos];
        this.loading = false;
      }, error => {
        this.loading = false;
        console.error(error);
      });
  }

  ngOnDestroy(): void {
    this.photosub.unsubscribe();
  }
}

const getFirstWord = (str: string) => {
  const spacePosition = str.indexOf(' ');
  if (spacePosition === -1) {
    return str;
  } else {
    return str.substr(0, spacePosition);
  }
};
