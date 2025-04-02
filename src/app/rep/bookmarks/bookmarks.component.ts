import { Component } from '@angular/core';
import { BookmarksService } from '../../services/bookmarks.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bookmarks',
  imports: [CommonModule,FormsModule,MatInputModule,
      MatButtonModule,
      MatCardModule,MatTableModule],
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
