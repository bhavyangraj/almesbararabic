import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  Input,
  SimpleChange,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiServiceService } from '../../services/api-service.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-endingsection',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, RouterLink, SafeUrlPipe],
  templateUrl: './endingsection.component.html',
  styleUrl: './endingsection.component.css',
})
export class EndingsectionComponent implements OnChanges {
  @Input() url: any = 'books';
  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private apiService: ApiServiceService,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  private isBrowser: boolean;
  studies_in_tolerance: any[] = [];
  title: any;

  gotoDetail(slide: any) {
    if (this.url == 'books') {
      this.router.navigate(['/books/' + slide.id]);
    } else if (this.url == 'studies') {
      this.router.navigate(['/studies/' + slide._id]);
    } else if (this.url == 'probeinmedia') {
      this.router.navigate(['/probeinmedia/' + slide._id]);
    } else if (this.url == 'probelibrary') {
      this.router.navigate([`/probelibrary/${slide.id}/${slide._id}`]);
    } else if (this.url == 'articles') {
      this.router.navigate(['/articles/' + slide._id]);
    } else if (this.url == 'audiobooks') {
      this.router.navigate(['/audiobooks/' + slide._id]);
    } else if (this.url == 'taliban') {
      this.router.navigate(['/taliban/' + slide._id]);
    } else if (this.url == 'philosophicals') {
      this.router.navigate(['/philosophical/' + slide._id]);
    } else if (this.url == 'generals') {
      this.router.navigate(['/general/' + slide._id]);
    } else if (this.url == 'files') {
      this.router.navigate(['/files/' + slide._id]);
    } else if (this.url == 'interviews') {
      this.router.navigate(['/interviews/' + slide._id]);
    } else if (this.url == 'studiesintolerance') {
      this.router.navigate(['/studiesintolerance/' + slide._id]);
    } else if (this.url == 'videos') {
      this.router.navigate(['/videos/' + slide._id]);
    } else if (this.url == 'summary') {
      this.router.navigate(['/summary/' + slide._id]);
    } else if (this.url == 'AMessageFromNewyork') {
      this.router.navigate(['/amessagefromnewyork/' + slide._id]);
    } else if (this.url == 'CenterNews') {
      this.router.navigate(['/centernews/' + slide._id]);
    } else if (this.url == 'Covid19Pandemic') {
      this.router.navigate(['/covid19pandemics/' + slide._id]);
    } else if (this.url == 'Editorials') {
      this.router.navigate(['/editorials/' + slide._id]);
    } else if (this.url == 'Immigration') {
      this.router.navigate(['/immigrations/' + slide._id]);
    } else if (this.url == 'LebaneseIslamists') {
      this.router.navigate(['/lebaneseislamists/' + slide._id]);
    } else if (this.url == 'Mainmajor') {
      this.router.navigate(['/mainmajors/' + slide._id]);
    } else if (this.url == 'OtherPaths') {
      this.router.navigate(['/otherpaths/' + slide._id]);
    } else if (this.url == 'PopeFrancisVisit') {
      this.router.navigate(['/popefrancisvisit/' + slide._id]);
    } else if (this.url == 'ReadingReport') {
      this.router.navigate(['/readingreport/' + slide._id]);
    } else if (this.url == 'SupportingWomenWeakensExtremism') {
      this.router.navigate(['/supportingwomenweakensextremism/' + slide._id]);
    } else if (this.url == 'TeachingPhilosophy') {
      this.router.navigate(['/teachingphilosophies/' + slide._id]);
    } else if (this.url == 'TheCenterWrote') {
      this.router.navigate(['/thecenterwrotes/' + slide._id]);
    } else if (this.url == 'Translations') {
      this.router.navigate(['/translations/' + slide._id]);
    } else if (this.url == 'WeeklyReports') {
      this.router.navigate(['/weeklyreports/' + slide._id]);
    } else if (this.url == 'areport') {
      this.router.navigate(['/areports/' + slide._id]);
    } else if (this.url == 'ediorpick') {
      this.router.navigate(['/ediorspicks/' + slide._id]);
    } else if (this.url == 'dialouge') {
      this.router.navigate(['/dialouges/' + slide._id]);
    } else if (this.url == 'readingabook') {
      this.router.navigate(['/readingabooks/' + slide._id]);
    } else if (this.url == 'selection') {
      this.router.navigate(['/selections/' + slide._id]);
    } else if (this.url == 'September11Events') {
      this.router.navigate(['/september11events/' + slide._id]);
    } else if (this.url == 'infographics') {
      this.router.navigate(['/infographics/' + slide._id]);
    } else if (this.url == 'iranianstudies') {
      this.router.navigate(['/iranianstudies/' + slide._id]);
    }
  }

  gotoDetail2() {
    if (this.url == 'books') {
      this.router.navigate(['/books']);
    } else if (this.url == 'studies') {
      this.router.navigate(['/studies']);
    } else if (this.url == 'probeinmedia') {
      this.router.navigate(['/probeinmedia']);
    } else if (this.url == 'probelibrary') {
      this.router.navigate(['/probelibrary']);
    } else if (this.url == 'articles') {
      this.router.navigate(['/articles']);
    } else if (this.url == 'audiobooks') {
      this.router.navigate(['/audiobooks']);
    } else if (this.url == 'taliban') {
      this.router.navigate(['/taliban']);
    } else if (this.url == 'philosophicals') {
      this.router.navigate(['/philosophical']);
    } else if (this.url == 'generals') {
      this.router.navigate(['/general']);
    } else if (this.url == 'files') {
      this.router.navigate(['/files']);
    } else if (this.url == 'interviews') {
      this.router.navigate(['/interviews']);
    } else if (this.url == 'studiesintolerance') {
      this.router.navigate(['/studiesintolerance']);
    } else if (this.url == 'videos') {
      this.router.navigate(['/videos']);
    } else if (this.url == 'summary') {
      this.router.navigate(['/summary']);
    } else if (this.url == 'AMessageFromNewyork') {
      this.router.navigate(['/amessagefromnewyork']);
    } else if (this.url == 'CenterNews') {
      this.router.navigate(['/centernews']);
    } else if (this.url == 'Covid19Pandemic') {
      this.router.navigate(['/covid19pandemics']);
    } else if (this.url == 'Editorials') {
      this.router.navigate(['/editorials']);
    } else if (this.url == 'Immigration') {
      this.router.navigate(['/immigrations']);
    } else if (this.url == 'LebaneseIslamists') {
      this.router.navigate(['/lebaneseislamists']);
    } else if (this.url == 'Mainmajor') {
      this.router.navigate(['/mainmajors']);
    } else if (this.url == 'OtherPaths') {
      this.router.navigate(['/otherpaths']);
    } else if (this.url == 'PopeFrancisVisit') {
      this.router.navigate(['/popefrancisvisit']);
    } else if (this.url == 'ReadingReport') {
      this.router.navigate(['/readingreport']);
    } else if (this.url == 'SupportingWomenWeakensExtremism') {
      this.router.navigate(['/supportingwomenweakensextremism']);
    } else if (this.url == 'TeachingPhilosophy') {
      this.router.navigate(['/teachingphilosophies']);
    } else if (this.url == 'TheCenterWrote') {
      this.router.navigate(['/thecenterwrotes']);
    } else if (this.url == 'Translations') {
      this.router.navigate(['/translations']);
    } else if (this.url == 'WeeklyReports') {
      this.router.navigate(['/weeklyreports']);
    } else if (this.url == 'areport') {
      this.router.navigate(['/areports']);
    } else if (this.url == 'ediorpick') {
      this.router.navigate(['/ediorspicks']);
    } else if (this.url == 'dialouge') {
      this.router.navigate(['/dialouges']);
    } else if (this.url == 'readingabook') {
      this.router.navigate(['/readingabooks']);
    } else if (this.url == 'selection') {
      this.router.navigate(['/selections']);
    } else if (this.url == 'September11Events') {
      this.router.navigate(['/september11events']);
    } else if (this.url == 'infographics') {
      this.router.navigate(['/infographics']);
    } else if (this.url == 'iranianstudies') {
      this.router.navigate(['/iranianstudies']);
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['url'] && changes['url'].currentValue) {
      let data: any;
      if (this.url == 'probeinmedia') {
        data = 'probe_in_medias';
      } else if (this.url == 'probelibrary') {
        data = 'probe_libraries';
      } else if (this.url == 'studiesintolerance') {
        data = 'studies_in_tolerances';
      } else {
        data = this.url;
      }

      this.title = this.apiService.getArabicName(data);
      this.get();
    }
  }

  get() {
    this.apiService.getFull2(this.url).subscribe(
      (data: any) => {
        if (Array.isArray(data.data)) {
          this.studies_in_tolerance = data.data.slice(0, 5);
        } else {
          this.studies_in_tolerance = [];
        }
      },
      (error) => {
        this.studies_in_tolerance = [];
      },
    );
  }
}
