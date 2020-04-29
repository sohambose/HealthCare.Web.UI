import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class DashboardService {    
    arrTimelineData=[];

    constructor(private http: HttpClient) {
    }

    getTimelineDataByCountry() {
        console.log('Data Fetch From Server Started');
        return this.http
            .get('https://api.thevirustracker.com/free-api?countryTimeline=IN')
            .pipe(
                map(responsedata => responsedata["timelineitems"])
            )
            .pipe(
                map(responseData => {
                    const TimelineArray = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            TimelineArray.push({ ...responseData[key], id: key });
                        }
                    }
                    console.log('Data Fetch From Server Completed');
                    console.log(TimelineArray);
                    this.arrTimelineData = TimelineArray;
                    return TimelineArray;
                })
            )
    }

    dovolumneAnalysis(arrCandles: any[], days: number) {
        alert('In func');
        for (let i = 0; i < days - 1; i++) {
            console.log(arrCandles[i]["5. volume"]);
            this.volume_sum = Number(this.volume_sum) + Number(arrCandles[i]["5. volume"]);
        }
        alert(this.volume_sum);
        this.volume_avg = Number(this.volume_sum) / Number(days);
        if (this.volume_avg < Number(arrCandles[days - 1]["5. volume"])) {
            this.IsVolumeIncreased = true;
        }
        return this.IsVolumeIncreased;
    }
}