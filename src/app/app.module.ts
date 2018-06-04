import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from '../app-mat.module';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { AuthHttpInterceptor } from './app.interceptor';
import { AppRoutes } from './app.routes';
import { ArticleResolver } from './article.resolver';
import { ArticleComponent } from './article/article.component';
import { ComposerComponent } from './composer/composer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MarkdownDirective } from './markdown.directive';
import { MarkdownService } from './markdown.service';
import { PostComponent } from './post/post.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardArticleComponent } from './dashboard/dashboard-article/dashboard-article.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchbarComponent,
    ToolbarComponent,
    ComposerComponent,
    AdminComponent,
    ArticleComponent,
    HomeComponent,
    SidebarComponent,
    AboutComponent,
    PostComponent,
    LoginComponent,
    DashboardComponent,
    MarkdownDirective,
    DashboardArticleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppMaterialModule,
    LayoutModule,
    RouterModule.forRoot(AppRoutes),
    BrowserAnimationsModule
  ],
  providers: [
    MarkdownService,
    ArticleResolver,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
