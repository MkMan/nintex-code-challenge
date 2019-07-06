import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nintex-code-challenge';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('//localhost:3000/discounts', {withCredentials: true}).subscribe(response => {
      console.log(response);
    });
  }
}
