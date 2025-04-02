import { Component } from '@angular/core';
import { BookmarksService } from '../../services/bookmarks.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SHARED_IMPORTS } from '../../shared/shared-imports';

@Component({
  selector: 'app-bookmarks',
  imports: [SHARED_IMPORTS],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.scss'
})
export class BookmarksComponent {
  bookmarks: any[] = [];

  constructor(private bookmarksService: BookmarksService,private dialogRef: MatDialogRef<BookmarksComponent>) {
    this.bookmarks = this.bookmarksService.getBookmarks();
  }

  removeBookmark(repo: any): void {
    this.bookmarksService.removeBookmark(repo);
    console.log('1');
    this.bookmarks = this.bookmarksService.getBookmarks(); 
    console.log('2');

  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
