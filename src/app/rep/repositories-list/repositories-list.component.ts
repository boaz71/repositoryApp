import { Component, EventEmitter, Input ,OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { RepositoriesService } from '../../services/repositories.service';
import { BookmarksService } from '../../services/bookmarks.service';
import { BookmarksComponent } from '../bookmarks/bookmarks.component';
import { MatDialog } from '@angular/material/dialog'
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repositories-list',
  imports: [SHARED_IMPORTS],
  templateUrl: './repositories-list.component.html',
  styleUrl: './repositories-list.component.scss'
})
export class RepositoriesListComponent implements OnInit {  
 
  searchKeyword: string = '';
  repositories: any[] = [];
  displayedColumns: string[] = ['name', 'avatar', 'owner', 'bookmark']; // עמודות הטבלה
  missingReposetorySearch: boolean = false; // משתנה בוליאני לצורך הצגת הודעת שגיאה אם לא נמצאו תוצאות חיפוש
  constructor(private router: Router,private authService: AuthService,private repService:RepositoriesService,private bookmarksService:BookmarksService,private dialog: MatDialog) {}

  @Output() loggedOut = new EventEmitter<void>();

  @Input() loadData!: boolean;

  ngOnInit(): void {

    
  }

   onSearch() {
    this.missingReposetorySearch = false; // איפוס משתנה החיפוש
    if (!this.searchKeyword.trim()) {
      alert('Please enter a keyword!');
      return;
    }

    this.repService.searchRepositories(this.searchKeyword).subscribe(
      (data: any) => {
        this.repositories = data.items || [];
        if (this.repositories.length === 0) {
          this.missingReposetorySearch = true; // אם לא נמצאו תוצאות חיפוש
        } 
      },
      (error) => {
        this.missingReposetorySearch = true; // אם לא נמצאו תוצאות חיפוש
        console.error('Error fetching repositories:', error);
        alert('Failed to fetch repositories.');
      }
    );

   }

  bookmarkRepo(repo: any): void {
    this.bookmarksService.addBookmark(repo);
    alert(`Repository "${repo.name}" has been bookmarked!`);
  }

  openBookmarks(): void {
    this.dialog.open(BookmarksComponent, {
      width: '90vw', 
      height: '80vh',
      data: this.bookmarksService.getBookmarks()
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // ניווט חזרה למסך ההתחברות
    this.loggedOut.emit();
  }

}
