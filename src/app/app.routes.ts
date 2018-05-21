import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { ComposerComponent } from './composer/composer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';

export const AppRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'you-should-not-be-here', component: ComposerComponent },
  { path: 'article/:title', component: ArticleComponent },
  { path: 'about', component: AboutComponent },
  { path: 'list', component: ListComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
