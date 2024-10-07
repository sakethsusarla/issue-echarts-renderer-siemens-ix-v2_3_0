import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedOnboardsSummaryComponent } from './connected-onboards-summary.component';
import { ConnectedOnboardsComponent } from '../connected-onboards/connected-onboards.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IxModule } from '@siemens/ix-angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LineChartComponent } from '../line-chart/line-chart.component';

describe('ConnectedOnboardsSummaryComponent', () => {
  let connectedOnboardsSummaryComponent: ConnectedOnboardsSummaryComponent;
  let fixture: ComponentFixture<ConnectedOnboardsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, IxModule.forRoot(), AppRoutingModule],
      declarations: [ConnectedOnboardsComponent, ConnectedOnboardsSummaryComponent, LineChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectedOnboardsSummaryComponent);
    connectedOnboardsSummaryComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(connectedOnboardsSummaryComponent).toBeTruthy();
  });

  it('should unsubscribe onDestroy', () => {
    const connectedOnboardsSummarySpy = spyOn(connectedOnboardsSummaryComponent['_connectedOnboardsChartDataSubscription'], 'unsubscribe');

    connectedOnboardsSummaryComponent.ngOnDestroy();

    expect(connectedOnboardsSummarySpy).toHaveBeenCalled();
  });

  it('should initialize component properties correctly', () => {
    expect(connectedOnboardsSummaryComponent.onboardsLineChartDataMap).toEqual(new Map());
  });
});