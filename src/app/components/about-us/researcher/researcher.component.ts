import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiServiceService } from '../../../services/api-service.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-researcher',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './researcher.component.html',
  styleUrl: './researcher.component.css',
})
export class ResearcherComponent {
  constructor(private apiService: ApiServiceService, private router: Router) {}

  researchers = Array.from({ length: 50 }, (_, i) => ({
    name: `Researcher ${i + 1}`,
    photo: `https://placehold.co/150x150?text=R${i + 1}`,
  }));

  url = 'getAllAuthors';
  url2 = 'researchers';
  studiesintolerances: any[] = [];
  page = 1;
  pageSize = 10;
  pageSizes = [10, 50, 100, 200, 300, 400];
  size = 0;
  totalPages: any;
  search = '';

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.apiService
      .getAll(this.url, this.search, this.page, this.pageSize)
      .subscribe(
        (data: any) => {
          this.studiesintolerances = data.data;
          this.studiesintolerances = data.data
            .filter((item: any) => !['1'].includes(item.id))
            .sort((a: any, b: any) => a.id - b.id);
          this.getResearchers();
          this.size = data.count;
        },
        (error) => {}
      );
  }

  getResearchers() {
    this.apiService
      .getAll(this.url2, this.search, this.page, this.pageSize)
      .subscribe(
        (data: any) => {
          this.studiesintolerances = [
            ...this.studiesintolerances,
            ...data.data,
          ];

          this.size = data.count;
        },
        (error) => {}
      );
  }
}
