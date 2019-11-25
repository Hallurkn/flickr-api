import { ImageService } from './shared/services/image/image.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedComponent } from './states/feed/feed.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FeedHeaderComponent } from './states/feed/feed-header/feed-header.component';
import { FeedItemComponent } from './states/feed/feed-item/feed-item.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    LayoutComponent,
    HeaderComponent,
    FeedHeaderComponent,
    FeedItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
