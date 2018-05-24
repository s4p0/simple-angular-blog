import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ArticleComponent } from './article/article.component';
import { ComposerComponent } from './composer/composer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ArticleResolver } from './article.resolver';
import { ShellComponent } from './shell/shell.component';

// export const AppRoutes: Routes = [
//   { path: 'home', component: HomeComponent },
//   { path: 'you-should-not-be-here', component: ComposerComponent },
//   {
//     path: 'article/:permalink',
//     resolve: { article: ArticleResolver },
//     component: ArticleComponent
//   },
//   { path: 'about', component: AboutComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'dashboard', component: DashboardComponent },
//   { path: '', redirectTo: 'home', pathMatch: 'full' }
// ];

export const AppRoutes: Routes = [
  // {
  //   path: '',
  //   component: ShellComponent,
  //   children: [
  //     { path: 'home', component: HomeComponent },
  //     {
  //       path: 'article/:permalink',
  //       resolve: { article: ArticleResolver },
  //       component: ArticleComponent
  //     },
  //     { path: '', redirectTo: 'home', pathMatch: 'full' }
  //   ]
  // }
  { path: 'home', component: HomeComponent },
  { path: 'you-should-not-be-here', component: ComposerComponent },
  {
    path: 'article/:permalink',
    resolve: { article: ArticleResolver },
    component: ArticleComponent
  },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
