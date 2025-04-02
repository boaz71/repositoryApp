
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './app/services/auth.service';
import { RepositoriesService } from './app/services/repositories.service';
import { BookmarksService } from './app/services/bookmarks.service';

// ספקים נוספים כמו API_BASE_URL
const providers = [
  provideHttpClient(),
  AuthService,
  RepositoriesService,
  BookmarksService,
  { provide: 'API_BASE_URL', useValue: 'http://localhost:5208/api/' } 
];

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,  // הספקים מ-appConfig
    ...providers,  // הספקים הנוספים
  ],
}).catch((err) => console.error(err));
