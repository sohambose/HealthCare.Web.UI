import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Key } from 'protractor';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    arrTimelineData = [];
    arrTotalCasesData = [];
    arrDates = [];

    constructor(private http: HttpClient) {
    }

    getTimelineDataByCountry() {        
        return this.http
            .get('https://api.thevirustracker.com/free-api?countryTimeline=IN')
            .pipe(
                map(responsedata => responsedata["timelineitems"])  //This will return array with 1 item.Th 0yh item has all json objects in it
            )
            .pipe(
                map(arrTimeLineItems => arrTimeLineItems[0])  //Return the 0th element-this contains all JSON objects
            )
            .pipe(
                map(arr0thItem => {
                    const TimelineArray = [];
                    for (const key in arr0thItem) {
                        if (arr0thItem.hasOwnProperty(key)) {
                            TimelineArray.push({ ...arr0thItem[key], id: key });
                        }
                    }
                    this.arrTimelineData = TimelineArray;                   
                    return TimelineArray;
                })
            )
    }

    GetTotalCasesFromJsonArray(arrRawData: any[]) {
        this.arrTotalCasesData = [];       
        arrRawData.forEach(item => {
            this.arrTotalCasesData.push(item["total_cases"]);
        })
        this.arrTotalCasesData.pop();       
        return this.arrTotalCasesData;
    }

    GetDatesFromJsonArray(arrRawData: any[]) {
        this.arrDates = [];
        arrRawData.forEach(item => {
            this.arrDates.push(item["id"]);
        })
        this.arrDates.pop();
        return this.arrDates;
    }




}