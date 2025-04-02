import { Component, Input ,OnChanges, SimpleChanges} from '@angular/core';
import { RepositoriesService } from '../../services/repositories.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { BookmarksService } from '../../services/bookmarks.service';
import { BookmarksComponent } from '../bookmarks/bookmarks.component';
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-repositories-list',
  imports: [CommonModule,FormsModule,MatInputModule,
    MatButtonModule,
    MatCardModule,MatTableModule],
  templateUrl: './repositories-list.component.html',
  styleUrl: './repositories-list.component.scss'
})
export class RepositoriesListComponent implements OnChanges {

  searchKeyword: string = '';
  repositories: any[] = [];
  displayedColumns: string[] = ['name', 'avatar', 'owner', 'bookmark']; // עמודות הטבלה


  constructor(private repService:RepositoriesService,private bookmarksService:BookmarksService,private dialog: MatDialog) {}

  @Input() loadData!: boolean;

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['loadData']) {
    //   const previousValue = changes['loadData'].previousValue;
    //   const currentValue = changes['loadData'].currentValue;
    //   console.log(`loadData changed: ${previousValue} -> ${currentValue}`);

    //   if (currentValue==true) {
    //     this.repService.searchRepositories('angular').subscribe((data => {
    //       debugger;
    //       this.repositories = data.items || [];
    //     }))  
    //   }

    //   // if (currentValue) {
    //   //   console.log('The status is now not changed');
    //   // } else {
    //   //   console.log('The status is now changed');
    //   // }
    // }
   } 

   onSearch() {
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

}
