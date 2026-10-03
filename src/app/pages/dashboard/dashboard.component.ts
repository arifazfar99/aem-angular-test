import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/core/dashboard.service';
import { DashboardData } from 'src/app/core/dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: DashboardData | null = null;
  loading = true;
  errorMessage = '';

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getDashboard().subscribe({
      next: (data) => {
        this.data = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load dashboard data.';
        this.loading = false;
      }
    });
  }

}
