import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IxModule } from '@siemens/ix-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import '@siemens/ix-echarts';
import * as echarts from 'echarts/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { AppComponent } from './app.component';
import { LineChartComponent } from './line-chart.component';

@NgModule({
  declarations: [AppComponent, LineChartComponent],
  imports: [
    BrowserModule,
    IxModule.forRoot(),
    NgxEchartsModule.forRoot({ echarts }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
