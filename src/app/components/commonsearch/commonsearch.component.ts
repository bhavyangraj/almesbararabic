import { Component } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-commonsearch',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './commonsearch.component.html',
  styleUrl: './commonsearch.component.css',
})
export class CommonsearchComponent {
  results: any[] = [];
  isLoading = false;
  public isActive: any = true;
  search = '';
  totalPages: any;
  page = 1;
  pageSize = 4;
  size = 0;
  url = 'search';

  constructor(
    private apiService: ApiServiceService,
    private router: Router,
  ) {}

  gotoDetailPage(item: any) {
    if (item.category == 'Books') {
      this.router.navigate(['/books/' + item.id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Articles') {
      this.router.navigate(['/articles/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Audiobooks') {
      this.router.navigate(['/audiobooks/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Files') {
      this.router.navigate(['/files/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Generals') {
      this.router.navigate(['/general/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Highdeabtes') {
      this.router.navigate(['/highdebate/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Interviews') {
      this.router.navigate(['/interviews/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Philosophicals') {
      this.router.navigate(['/philosophical/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Probe In Medias') {
      this.router.navigate(['/probeinmedia/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Probe Libraries') {
      this.router.navigate([`/probelibrary/${item.id}/${item._id}`]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Studies') {
      this.router.navigate(['/studies/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Studies In Tolerances') {
      this.router.navigate(['/studiesintolerance/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Summaries') {
      this.router.navigate(['/summary/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Talibans') {
      this.router.navigate(['/taliban/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Videos') {
      this.router.navigate(['/videos/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Weekly Reports') {
      this.router.navigate(['/weeklyreports/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Translations') {
      this.router.navigate(['/translations/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'The Center Wrotes') {
      this.router.navigate(['/thecenterwrotes/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Teaching Philosophies') {
      this.router.navigate(['/teachingphilosophies/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Supporting Women Weaken Sextremism') {
      this.router.navigate(['/supportingwomenweakensextremism/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Reading Report') {
      this.router.navigate(['/readingreport/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Pope Francis Visit') {
      this.router.navigate(['/popefrancisvisit/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Other Paths') {
      this.router.navigate(['/otherpaths/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Main Majors') {
      this.router.navigate(['/mainmajors/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Lebanese Islamists') {
      this.router.navigate(['/lebaneseislamists/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Immigrations') {
      this.router.navigate(['/immigrations/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'editorials') {
      this.router.navigate(['/Editorials/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Covid19 Pandemics') {
      this.router.navigate(['/covid19pandemics/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Center News') {
      this.router.navigate(['/centernews/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'A Message From Newyork') {
      this.router.navigate(['/amessagefromnewyork/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'A Reports') {
      this.router.navigate(['/areports/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Ediors Picks') {
      this.router.navigate(['/ediorspicks/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Dialouges') {
      this.router.navigate(['/dialouges/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Reading A Books') {
      this.router.navigate(['/readingabooks/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'Selections') {
      this.router.navigate(['/selections/' + item._id]);
      this.search = '';
      this.results = [];
    } else if (item.category == 'September 11 Events') {
      this.router.navigate(['/september11events/' + item._id]);
      this.search = '';
      this.results = [];
    }
  }

  get2() {
    let page = 1;
    if (this.isLoading || !this.search || this.search == '') return;
    this.isLoading = true;

    this.apiService
      .getSearch(this.url, this.search, page, this.pageSize)
      .subscribe(
        (data: any) => {
          this.results = data.results;

          this.totalPages = data.totalPages;
          this.isLoading = false;
          this.size = data.totalResults;
        },
        (error) => {},
      );
  }
}
