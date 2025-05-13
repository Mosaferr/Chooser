import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee.model'; // Zakładając, że model jest w pliku employee.model.ts

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployeeId: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Employee[]>('assets/data/employees.json')
      .subscribe(data => {
        this.employees = data;
      });
  }
}
