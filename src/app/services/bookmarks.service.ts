import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  private readonly BOOKMARKS_KEY = 'bookmarked_repositories'; 
  //private bookmarks: any[] = []; 

  getBookmarks(): any[] {
    const bookmarks = sessionStorage.getItem(this.BOOKMARKS_KEY);
    return bookmarks ? JSON.parse(bookmarks) : [];
  }

  addBookmark(repo: any): void {
    const bookmarks = this.getBookmarks();
    if (!bookmarks.find((bookmark: any) => bookmark.id === repo.id)) {
      bookmarks.push(repo);
      sessionStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(bookmarks));
    }
  }

  removeBookmark(repo: any): void {
    const bookmarks = this.getBookmarks();
    const updatedBookmarks = bookmarks.filter((bookmark: any) => bookmark.id !== repo.id);
    sessionStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(updatedBookmarks));
  }
}
