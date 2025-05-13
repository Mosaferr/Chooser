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
  isSortedBy: string = '';  // Nowa zmienna do śledzenia aktywnego sortowania

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

  // Sortowanie po imieniu
  sortEmployeesByFirstName(): void {
    this.employees.sort((a, b) => a.firstName.localeCompare(b.firstName));
    this.isSortedBy = 'firstName';  // Zmieniamy aktywne sortowanie
  }

  // Sortowanie po nazwisku
  sortEmployeesByLastName(): void {
    this.employees.sort((a, b) => a.lastName.localeCompare(b.lastName));
    this.isSortedBy = 'lastName';  // Zmieniamy aktywne sortowanie
  }

  // Sortowanie po hierarchii
  sortEmployeesByHierarchy(): void {
    const sortByHierarchy = (employees: any[]) => {
      return employees.sort((a, b) => {
        // Porównujemy poziom hierarchii
        const aLevel = this.getEmployeeHierarchyLevel(a.id);
        const bLevel = this.getEmployeeHierarchyLevel(b.id);
        return aLevel - bLevel;
      });
    };

    this.employees = sortByHierarchy(this.employees);
    this.isSortedBy = 'hierarchy';  // Zmieniamy aktywne sortowanie
  }

  // Funkcja pomocnicza do sprawdzania poziomu hierarchii
  getEmployeeHierarchyLevel(id: string): number {
    const findLevel = (emp: any, level: number = 0): number => {
      if (emp.id === id) return level;
      for (let sub of emp.subordinates || []) {
        const result = findLevel(sub, level + 1);
        if (result !== -1) return result;
      }
      return -1;
    };
    return findLevel(this.employeeHierarchy);
  }
}
