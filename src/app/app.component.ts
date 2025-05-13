import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployeeId: string = '';
  employeeHierarchy: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Employee[]>('assets/data/employees.json')
      .subscribe(data => this.employees = data);

    this.http.get<any>('assets/data/employee-structure.json')
      .subscribe(data => this.employeeHierarchy = data);
  }

  getEmployeeHierarchy(id: string): any {
    const find = (emp: any): any => {
      if (emp.id === id) return emp;
      for (let sub of emp.subordinates || []) {
        const result = find(sub);
        if (result) return result;
      }
      return null;
    };
    return find(this.employeeHierarchy);
  }
}
