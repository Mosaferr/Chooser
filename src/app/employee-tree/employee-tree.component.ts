import { Component, Input } from '@angular/core';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-tree',
  templateUrl: './employee-tree.component.html',
  styleUrls: ['./employee-tree.component.css']
})
export class EmployeeTreeComponent {
  @Input() employee!: Employee;
}
