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
  employeeHierarchy: any; // Zmienna do przechowywania struktury hierarchii

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Załaduj pracowników
    this.http.get<Employee[]>('assets/data/employees.json')
      .subscribe(data => {
        this.employees = data;
      });

    // Załaduj hierarchię
    this.http.get<any>('assets/data/employee-structure.json')
      .subscribe(data => {
        this.employeeHierarchy = data;
      });
  }

  // Funkcja do znalezienia wybranego pracownika w strukturze hierarchii
  getEmployeeHierarchy(id: string): any {
    const findHierarchy = (employee: any): any => {
      if (employee.id === id) {
        return employee;
      }
      for (let subordinate of employee.subordinates || []) {
        const result = findHierarchy(subordinate);
        if (result) return result;
      }
      return null;
    };

    return findHierarchy(this.employeeHierarchy);
  }

  // Funkcja renderująca drzewo hierarchii
  renderHierarchy(employee: any): string {
    if (!employee) return '';

    let result = `${employee.firstName} ${employee.lastName}`;

    if (employee.subordinates && employee.subordinates.length > 0) {
      result += '<ul>';
      for (let sub of employee.subordinates) {
        result += `<li>${this.renderHierarchy(sub)}</li>`;
      }
      result += '</ul>';
    }

    return result;
  }
}
