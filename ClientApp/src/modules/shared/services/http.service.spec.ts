import { HttpClient, HttpClientModule, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed, waitForAsync } from '@angular/core/testing';

import { HttpService } from './http.service';
import { firstValueFrom, of } from 'rxjs';
export class ResponseData {
  id: number;
  name: string;
  value: number;
}
describe('HttpService', () => {
  let httpService: HttpService;
  let httpServiceClient: HttpService;
  let httpClientSpy: { request: jasmine.Spy };
  let httpTestingController: HttpTestingController;
  let baseUrl = 'http://localhost:8080/baseurl';
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule, HttpClientTestingModule],
        providers: [HttpClient]
      }).compileComponents();
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['request']);
      httpService = new HttpService(<any>httpClientSpy);

      httpTestingController = TestBed.inject(HttpTestingController);
      httpServiceClient = TestBed.inject(HttpService);
    })
  );

  it('should be created', inject([HttpService], (service: HttpService) => {
    expect(service).toBeTruthy();
  }));

  it('should return expected get', async () => {
    const expectedTarifs: ResponseData[] = [
      { id: 1, name: 'Tarif1', value: 20 },
      { id: 2, name: 'Tarif2', value: 30 }
    ];

    httpClientSpy.request.and.returnValue(
      of(
        new HttpResponse(<any>{
          body: expectedTarifs
        })
      )
    );

    const pst1 = await firstValueFrom(httpService.get(''));
    expect(pst1).toEqual(expectedTarifs, 'expected tarifs');
    const pst2 = await firstValueFrom(httpService.get('', { test: '123' }, { Authorization: 'Basic 123' }));
    expect(pst2).toEqual(expectedTarifs, 'expected tarifs');
    expect(httpClientSpy.request.calls.count()).toBe(2, 'one call');
  });

  it('should return expected post', async () => {
    let expectedTarifs: ResponseData[] = [
      { id: 1, name: 'Tarif1', value: 20 },
      { id: 2, name: 'Tarif2', value: 20 },
      { id: 3, name: 'Tarif3', value: 30 }
    ];

    httpClientSpy.request.and.returnValue(
      of(
        new HttpResponse(<any>{
          body: expectedTarifs
        })
      )
    );

    const pst1 = await firstValueFrom(httpService.post(''));
    expect(pst1).toEqual(expectedTarifs, 'expected tarifs');
    const pst2 = await firstValueFrom(httpService.post('', { test: '123' }, { test: '123' }, { Authorization: 'Basic 123' }))
    expect(pst2).toEqual(expectedTarifs, 'expected tarifs');
    expect(httpClientSpy.request.calls.count()).toBe(2, 'one call');
  });

  it('should return expected patch', async () => {
    let expectedTarifs: ResponseData[] = [
      { id: 1, name: 'Tarif1', value: 20 },
      { id: 2, name: 'Tarif2', value: 20 },
      { id: 3, name: 'Tarif3', value: 30 }
    ];

    httpClientSpy.request.and.returnValue(
      of(
        new HttpResponse(<any>{
          body: expectedTarifs
        })
      )
    );

    const pst1 = await firstValueFrom(httpService.patch(''))
    expect(pst1).toEqual(expectedTarifs, 'expected tarifs');
    const pst2 = await firstValueFrom(httpService.patch('', { test: '123' }, { test: '123' }, { Authorization: 'Basic 123' }))
    expect(pst2).toEqual(expectedTarifs, 'expected tarifs');
    expect(httpClientSpy.request.calls.count()).toBe(2, 'one call');
  });

  it('should return expected delete', async () => {
    let expectedTarifs: ResponseData[] = [
      { id: 1, name: 'Tarif1', value: 20 },
      { id: 2, name: 'Tarif2', value: 20 },
      { id: 3, name: 'Tarif3', value: 30 }
    ];

    httpClientSpy.request.and.returnValue(
      of(
        new HttpResponse(<any>{
          body: expectedTarifs
        })
      )
    );

    const pst1 = await firstValueFrom(httpService.delete(''));
    expect(pst1).toEqual(expectedTarifs, 'expected tarifs');
    const pst2 = await firstValueFrom(httpService.delete('', { test: '123' }, { test: '123' }, { Authorization: 'Basic 123' }));
    expect(pst2).toEqual(expectedTarifs, 'expected tarifs');
    expect(httpClientSpy.request.calls.count()).toBe(2, 'one call');
  });
  it('should return expected put', (done: DoneFn) => {
    let expectedTarifs: ResponseData[] = [
      { id: 1, name: 'Tarif1', value: 20 },
      { id: 2, name: 'Tarif2', value: 20 },
      { id: 3, name: 'Tarif3', value: 30 }
    ];

    httpServiceClient.put(baseUrl, { test: '123' }, { test: '123' }, { Authorization: 'Basic 123' }).subscribe((tarifs) => {
      expect(tarifs).toEqual(expectedTarifs, 'expected tarifs');
      done();
    }, done.fail);

    const req = httpTestingController.expectOne({
      method: 'PUT',
      url: baseUrl + '?test=123'
    });

    req.flush(expectedTarifs);

    expect(req.request.body).toEqual({ test: '123' });
    expect(req.request.headers.get('Authorization')).toBeDefined();
  });

  it('should add file', (done: DoneFn) => {
    let expectedTarifs: ResponseData = { id: 1, name: 'Tarif1', value: 20 };

    httpClientSpy.request.and.returnValue(
      of(
        new HttpResponse(<any>{
          body: expectedTarifs
        })
      )
    );

    httpService.addFile('', { file: new File(['23'], 'test') }).subscribe((tarifs) => {
      expect(tarifs).toEqual(expectedTarifs, 'expected tarifs');
      done();
    }, done.fail);
    expect(httpClientSpy.request.calls.count()).toBe(1, 'one call');
  });

  it('should update file', (done: DoneFn) => {
    let expectedTarifs: ResponseData = { id: 1, name: 'Tarif1', value: 20 };

    httpClientSpy.request.and.returnValue(
      of(
        new HttpResponse(<any>{
          body: expectedTarifs
        })
      )
    );

    httpService.putFile('', { file: new File(['23'], 'test') }).subscribe((tarifs) => {
      expect(tarifs).toEqual(expectedTarifs, 'expected tarifs');
      done();
    }, done.fail);
    expect(httpClientSpy.request.calls.count()).toBe(1, 'one call');
  });
  it('should throw error', () => {
    let error: string;
    httpServiceClient.get(baseUrl).subscribe({error:(err)=>{
      error = err;
    }});
    

    let req = httpTestingController.expectOne(baseUrl);
    req.flush('Something went wrong', {
      status: 404,
      statusText: 'Network error'
    });
    httpClientSpy.request.and.returnValue(of(new HttpErrorResponse({ error: 'Error' })));
    httpService.resetHeaders();
    httpService.deleteHeader('Authorization');
    httpServiceClient.get('').subscribe({error:(err)=>{
      error = err;
    }});

    expect(error).toBeTruthy();
  });
});
