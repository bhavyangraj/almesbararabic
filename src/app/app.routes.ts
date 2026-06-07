import { Routes } from '@angular/router';
import { ErrorcomponentComponent } from './components/errorcomponent/errorcomponent.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'author/:id',
    loadComponent: () =>
      import('./components/authorview/authorview.component').then(
        (c) => c.AuthorviewComponent,
      ),
  },
  {
    path: 'taliban',
    loadComponent: () =>
      import('./components/taliban/taliban.component').then(
        (c) => c.TalibanComponent,
      ),
  },
  {
    path: 'files',
    loadComponent: () =>
      import('./components/Files/files/files.component').then(
        (c) => c.FilesComponent,
      ),
  },
  {
    path: 'results/:id',
    loadComponent: () =>
      import('./components/commonsearch/searcharesults/searcharesults.component').then(
        (c) => c.SearcharesultsComponent,
      ),
  },
  {
    path: 'files/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'videos/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'editorialboard/:id',
    loadComponent: () =>
      import('./components/authorview/authorview.component').then(
        (c) => c.AuthorviewComponent,
      ),
  },
  {
    path: 'researcher/:id',
    loadComponent: () =>
      import('./components/authorview/authorview.component').then(
        (c) => c.AuthorviewComponent,
      ),
  },
  {
    path: 'videos',
    loadComponent: () =>
      import('./components/videos/videos.component').then(
        (c) => c.VideosComponent,
      ),
  },
  {
    path: 'distributors',
    loadComponent: () =>
      import('./components/distributors/distributors.component').then(
        (c) => c.DistributorsComponent,
      ),
  },
  {
    path: 'editorialboard',
    loadComponent: () =>
      import('./components/editorial-board/editorial-board.component').then(
        (c) => c.EditorialBoardComponent,
      ),
  },
  {
    path: 'researcher',
    loadComponent: () =>
      import('./components/about-us/researcher/researcher.component').then(
        (c) => c.ResearcherComponent,
      ),
  },
  {
    path: 'articles',
    loadComponent: () =>
      import('./components/Articles/articles/articles.component').then(
        (c) => c.ArticlesComponent,
      ),
  },
  {
    path: 'summary',
    loadComponent: () =>
      import('./components/summary/summary.component').then(
        (c) => c.SummaryComponent,
      ),
  },
  {
    path: 'store',
    loadComponent: () =>
      import('./components/store/store.component').then(
        (c) => c.StoreComponent,
      ),
  },
  {
    path: 'whoweare',
    loadComponent: () =>
      import('./components/about-us/who-we-are/who-we-are.component').then(
        (c) => c.WhoWeAreComponent,
      ),
  },
  {
    path: 'contactus',
    loadComponent: () =>
      import('./components/about-us/contactus/contactus.component').then(
        (c) => c.ContactusComponent,
      ),
  },
  {
    path: 'privacypolicy',
    loadComponent: () =>
      import('./components/about-us/privacy-policy/privacy-policy.component').then(
        (c) => c.PrivacyPolicyComponent,
      ),
  },
  {
    path: 'highdebate',
    loadComponent: () =>
      import('./components/Articles/high-debate/high-debate.component').then(
        (c) => c.HighDebateComponent,
      ),
  },
  {
    path: 'articles/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'probeinmedia/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'general/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'philosophical/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'audiobooks/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'interviews/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'studies/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'studiesintolerance/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'summary/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'highdebate/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'taliban/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'september11events',
    loadComponent: () =>
      import('./components/viewcomponent/viewcomponent.component').then(
        (c) => c.ViewcomponentComponent,
      ),
  },
  {
    path: 'lebaneseislamists',
    loadComponent: () =>
      import('./components/viewcomponent/viewcomponent.component').then(
        (c) => c.ViewcomponentComponent,
      ),
  },
  {
    path: 'centernews',
    loadComponent: () =>
      import('./components/viewcomponent/viewcomponent.component').then(
        (c) => c.ViewcomponentComponent,
      ),
  },
  {
    path: 'immigrations',
    loadComponent: () =>
      import('./components/viewcomponent/viewcomponent.component').then(
        (c) => c.ViewcomponentComponent,
      ),
  },
  {
    path: 'teachingphilosophies',
    loadComponent: () =>
      import('./components/viewcomponent/viewcomponent.component').then(
        (c) => c.ViewcomponentComponent,
      ),
  },
  {
    path: 'translations',
    loadComponent: () =>
      import('./components/viewcomponent/viewcomponent.component').then(
        (c) => c.ViewcomponentComponent,
      ),
  },
  {
    path: 'weeklyreports',
    loadComponent: () =>
      import('./components/viewcomponent/viewcomponent.component').then(
        (c) => c.ViewcomponentComponent,
      ),
  },
  {
    path: 'covid19pandemics',
    loadComponent: () =>
      import('./components/viewcomponent/viewcomponent.component').then(
        (c) => c.ViewcomponentComponent,
      ),
  },
  {
    path: 'supportingwomenweakensextremism',
    loadComponent: () =>
      import('./components/viewcomponent/viewcomponent.component').then(
        (c) => c.ViewcomponentComponent,
      ),
  },
  {
    path: 'mainmajors',
    loadComponent: () =>
      import('./components/viewcomponent/viewcomponent.component').then(
        (c) => c.ViewcomponentComponent,
      ),
  },
  {
    path: 'readingabooks',
    loadComponent: () =>
      import('./components/viewcomponent/viewcomponent.component').then(
        (c) => c.ViewcomponentComponent,
      ),
  },
  {
    path: 'editorials',
    loadComponent: () =>
      import('./components/viewcomponent/viewcomponent.component').then(
        (c) => c.ViewcomponentComponent,
      ),
  },
  {
    path: 'otherpaths',
    loadComponent: () =>
      import('./components/viewcomponent/viewcomponent.component').then(
        (c) => c.ViewcomponentComponent,
      ),
  },
  {
    path: 'thecenterwrotes',
    loadComponent: () =>
      import('./components/viewcomponent/viewcomponent.component').then(
        (c) => c.ViewcomponentComponent,
      ),
  },
  {
    path: 'readingreport',
    loadComponent: () =>
      import('./components/viewcomponent/viewcomponent.component').then(
        (c) => c.ViewcomponentComponent,
      ),
  },
  {
    path: 'popefrancisvisit',
    loadComponent: () =>
      import('./components/viewcomponent/viewcomponent.component').then(
        (c) => c.ViewcomponentComponent,
      ),
  },
  {
    path: 'amessagefromnewyork',
    loadComponent: () =>
      import('./components/viewcomponent/viewcomponent.component').then(
        (c) => c.ViewcomponentComponent,
      ),
  },
  {
    path: 'selections',
    loadComponent: () =>
      import('./components/viewcomponent/viewcomponent.component').then(
        (c) => c.ViewcomponentComponent,
      ),
  },
  {
    path: 'ediorspicks',
    loadComponent: () =>
      import('./components/viewcomponent/viewcomponent.component').then(
        (c) => c.ViewcomponentComponent,
      ),
  },
  {
    path: 'dialouges',
    loadComponent: () =>
      import('./components/viewcomponent/viewcomponent.component').then(
        (c) => c.ViewcomponentComponent,
      ),
  },
  {
    path: 'areports',
    loadComponent: () =>
      import('./components/viewcomponent/viewcomponent.component').then(
        (c) => c.ViewcomponentComponent,
      ),
  },
  {
    path: 'september11events/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'lebaneseislamists/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'centernews/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'immigrations/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'teachingphilosophies/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'translations/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'weeklyreports/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'covid19pandemics/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'supportingwomenweakensextremism/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'mainmajors/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'readingabooks/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'editorials/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'otherpaths/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'thecenterwrotes/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'readingreport/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'popefrancisvisit/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'amessagefromnewyork/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'selections/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'ediorspicks/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'dialouges/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'areports/:id',
    loadComponent: () =>
      import('./components/internal-pages/internal-pages.component').then(
        (c) => c.InternalPagesComponent,
      ),
  },
  {
    path: 'infographics/:id',
    loadComponent: () =>
      import('./components/Infographics/infographics/infographics.component').then(
        (c) => c.InfographicsComponent,
      ),
  },
  {
    path: 'infographics',
    loadComponent: () =>
      import('./components/Infographics/infographics-view/infographics-view.component').then(
        (c) => c.InfographicsViewComponent,
      ),
  },
  {
    path: 'iranianstudies/:id',
    loadComponent: () =>
      import('./components/IranianStudies/iranianstudies/iranianstudies.component').then(
        (c) => c.IranianstudiesComponent,
      ),
  },
  {
    path: 'iranianstudies',
    loadComponent: () =>
      import('./components/IranianStudies/iranianstudies-view/iranianstudies-view.component').then(
        (c) => c.IranianstudiesViewComponent,
      ),
  },
  {
    path: 'irani',
    loadComponent: () =>
      import('./components/IranianStudies/iranianstudies-static/iranianstudies-static.component').then(
        (c) => c.IranianstudiesStaticComponent,
      ),
  },
  {
    path: 'books',
    loadComponent: () =>
      import('./components/books/books.component').then(
        (c) => c.BooksComponent,
      ),
  },
  {
    path: 'books/:id',
    loadComponent: () =>
      import('./components/books/books-details/books-details.component').then(
        (c) => c.BooksDetailsComponent,
      ),
  },
  {
    path: 'probeinmedia',
    loadComponent: () =>
      import('./components/Almesbar-Center/probe-in-media/probe-in-media.component').then(
        (c) => c.ProbeInMediaComponent,
      ),
  },
  {
    path: 'probelibrary',
    loadComponent: () =>
      import('./components/Almesbar-Center/probe-library/probe-library.component').then(
        (c) => c.ProbeLibraryComponent,
      ),
  },
  {
    path: 'probelibrary/:bookId/:itemId',
    loadComponent: () =>
      import('./components/Almesbar-Center/probe-library/probe-library-detail/probe-library-detail.component').then(
        (c) => c.ProbeLibraryDetailComponent,
      ),
  },
  {
    path: 'interviews',
    loadComponent: () =>
      import('./components/interviews/interviews.component').then(
        (c) => c.InterviewsComponent,
      ),
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./components/internal-pages/internal-pages.component').then(
            (c) => c.InternalPagesComponent,
          ),
      },
    ],
  },
  {
    path: 'studies',
    loadComponent: () =>
      import('./components/studies/studies.component').then(
        (c) => c.StudiesComponent,
      ),
  },
  {
    path: 'studiesintolerance',
    loadComponent: () =>
      import('./components/studies-in-tolerance/studies-in-tolerance.component').then(
        (c) => c.StudiesInToleranceComponent,
      ),
  },
  {
    path: 'philosophical',
    loadComponent: () =>
      import('./components/Concepts/philosophical/philosophical.component').then(
        (c) => c.PhilosophicalComponent,
      ),
  },
  {
    path: 'general',
    loadComponent: () =>
      import('./components/Concepts/general/general.component').then(
        (c) => c.GeneralComponent,
      ),
  },
  {
    path: 'audiobooks',
    loadComponent: () =>
      import('./components/Files/audio-books/audio-books.component').then(
        (c) => c.AudioBooksComponent,
      ),
  },
  {
    path: 'presidentspeech',
    loadComponent: () =>
      import('./components/about-us/president-speech/president-speech.component').then(
        (c) => c.PresidentSpeechComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/errorcomponent/errorcomponent.component').then(
        (c) => c.ErrorcomponentComponent,
      ),
  },
];
