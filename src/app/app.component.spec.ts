import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        HttpClient, HttpHandler
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-demo'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-demo');
  });

  it(`should have true loading field at initialization`, () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app.loading).toBeTrue()
  })

  it(`should have false loading field after loading app`, () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    // app.loading = false
    app.ngOnInit()
    expect(app.loading).toBeFalse()
  })

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const { debugElement } = fixture
  //   const loadingElement = debugElement.query(By.css('loading-app-container'))
  //   expect(loadingElement).toBeTruthy()
  //   // const compiled = fixture.nativeElement as HTMLElement;
  //   // expect(compiled.querySelector('.content span')?.textContent).toContain('angular-demo app is running!');
  // });
});
