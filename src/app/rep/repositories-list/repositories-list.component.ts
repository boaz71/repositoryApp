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
  onLoad= false; // משתנה בוליאני לצורך טעינת נתונים

  constructor(private router: Router,private authService: AuthService,private repService:RepositoriesService,private bookmarksService:BookmarksService,private dialog: MatDialog) {}

  @Output() loggedOut = new EventEmitter<void>();

  @Input() loadData!: boolean;

  ngOnInit(): void {

    this.onLoad= true; // אתחול משתנה הטעינה
    
  }

   onSearch() {
    this.onLoad= false;
    if (!this.searchKeyword.trim()) {
      alert('Please enter a keyword!');
      return;
    }

    this.repService.searchRepositories(this.searchKeyword).subscribe(
      (data: any) => {
        this.repositories = data.items || [];
      },
      (error) => {
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
