import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IxModule } from '@siemens/ix-angular';
import '@siemens/ix-echarts';
import * as echarts from 'echarts/core';
import { NgxEchartsModule } from 'ngx-echarts';
import {
  AppComponent,
  LineChartComponent,
} from 'src/app/components';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
  ],
  imports: [AppRoutingModule, BrowserModule, HttpClientModule, IxModule.forRoot(), NgxEchartsModule.forRoot({ echarts })],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
