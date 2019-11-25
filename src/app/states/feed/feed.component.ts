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
  public searchQuery = '';
  public perPage: number;
  public currentQuery: string;
  public isGrid = true;
  public images: Photo[] = [];
  private imageSub: Subscription = new Subscription();

  constructor(
    private imageService: ImageService,
  ) { }

  searchHandler(query: string, perPage?: number) {
    this.imageSub = this.imageService.getImages(query, perPage)
      .subscribe((res: Photo[]) => {
        this.images = res;
        this.currentQuery = query;
      }, error => {
        this.currentQuery = '';
        console.error(error);
      });
  }

  ngOnDestroy(): void {
    this.imageSub.unsubscribe();
  }
}
