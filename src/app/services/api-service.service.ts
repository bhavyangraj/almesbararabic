import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private readonly basePath = environment.apiUrl;

  private readonly jsonHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  // ==========================================
  // Generic Helpers
  // ==========================================

  private createParams(params: Record<string, any>): HttpParams {
    let httpParams = new HttpParams();

    Object.keys(params).forEach((key) => {
      const value = params[key];

      if (value !== null && value !== undefined && value !== '') {
        httpParams = httpParams.set(key, value);
      }
    });

    return httpParams;
  }

  private getRequest<T>(
    endpoint: string,
    params?: Record<string, any>,
  ): Observable<T> {
    return this.http.get<T>(`${this.basePath}${endpoint}`, {
      headers: this.jsonHeaders,
      params: this.createParams(params || {}),
    });
  }

  // ==========================================
  // Generic API Calls
  // ==========================================

  getAll(url: string, search: string, page: number, pageSize: number) {
    return this.getRequest<any>(url, {
      searchTerm: search,
      page,
      limit: pageSize,
    });
  }

  get(url: string, id: string) {
    return this.getRequest<any>(`${url}/${id}`);
  }

  getList(url: string) {
    return this.getRequest<any>(url);
  }

  getFull(url: string) {
    return this.getRequest<any>(`${url}/getall`);
  }

  getFull2(url: string) {
    return this.getRequest<any>(`${url}/getall`);
  }

  get_all(url: string) {
    return this.getRequest<any>(`${url}/all`);
  }

  // ==========================================
  // Books
  // ==========================================

  getBooks(
    url: string,
    search: string,
    page: number,
    pageSize: number,
    filter?: string,
  ) {
    return this.getRequest<any>(url, {
      searchTerm: search,
      page,
      limit: pageSize,
      filter,
    });
  }

  // ==========================================
  // Search
  // ==========================================

  getSearch(url: string, search: string, page: number, pageSize: number) {
    return this.getRequest<any>(url, {
      query: search,
      page,
      limit: pageSize,
    });
  }

  // ==========================================
  // Shop
  // ==========================================

  getShop(
    url: string,
    search: string,
    page: number,
    pageSize: number,
    type?: string,
    ebookOnly?: boolean,
  ) {
    return this.getRequest<any>(url, {
      searchTerm: search,
      type,
      ebookOnly,
      page,
      limit: pageSize,
    });
  }

  // ==========================================
  // Authors
  // ==========================================

  getAuthorData(authorName: string) {
    return this.getRequest<any>('searchall', {
      author: authorName,
    });
  }

  // ==========================================
  // PDF
  // ==========================================

  getPdfProxyUrl(url: string): string {
    return `${this.basePath}pdf?url=${encodeURIComponent(url)}`;
  }

  downloadPdf(url: string): string {
    return `${this.basePath}downloadpdf?url=${encodeURIComponent(url)}`;
  }

  // ==========================================
  // Arabic Names
  // ==========================================

  private readonly arabicNames: Record<string, string> = {
    articles: 'مقالات',
    generals: 'مفاهيم عامة',
    philosophicals: 'مفاهيم فلسفية',
    audiobooks: 'كتب صوتية',
    interviews: 'مقابلات',
    studies: 'دراسات',
    studies_in_tolerances: 'دراسات في التسامح',
    taliban: 'طالبان',
    probe_in_medias: 'المسبار في الإعلام',
    files: 'ملفات',
    videos: 'فيديو المسبار',
    highdebate: 'سجالات رفيعة',
    summary: 'ملخصات',
    probe_libraries: 'مكتبة المسبار',
    books: 'كتب المركز',
    AMessageFromNewyork: 'رسالة من نيويورك',
    CenterNews: 'اخبار المركز',
    Covid19Pandemic: 'جائحة (كوفيد -19)',
    Editorials: 'مقالات رئيس التحرير',
    Immigration: 'الهجرة',
    LebaneseIslamists: 'إسلاميو لبنان',
    Mainmajor: 'رئيسي',
    OtherPaths: 'مسارات أخرى',
    PopeFrancisVisit: 'زيارة البابا فرنسيس',
    ReadingReport: 'قراءة في تقرير',
    SupportingWomenWeakensExtremism: 'دعم المرأة يمرض التطرف',
    TeachingPhilosophy: 'تدريس الفلسفة',
    TheCenterWrote: 'كتب المركز',
    Translations: 'ترجمات',
    WeeklyReports: 'تقارير أسبوعية',
    areport: 'تقرير',
    ediorpick: 'اختيارات المحرر',
    dialouge: 'حوارات',
    readingabook: 'قراءة في كتاب',
    selection: 'مختارات',
    September11Events: 'أحداث 11 سبتمبر',
    infographics: 'إنفوجرافيك',
    iranianstudies: 'دراسات إيرانيّة',
  };

  getArabicName(key: string): string {
    return this.arabicNames[key] || 'Others';
  }
}
