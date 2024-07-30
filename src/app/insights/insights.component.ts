import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArcElement, BarController, BarElement, CategoryScale, Chart, Legend, LinearScale, LineController, LineElement, PieController, PointElement, PolarAreaController, RadialLinearScale, ScatterController, Title, Tooltip } from 'chart.js';
import { ExpenseService } from '../expense/expense.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
Chart.register(Title, Tooltip,LineController,ScatterController,LinearScale,PointElement, Legend,BarController,PieController,ArcElement, BarElement, CategoryScale,PolarAreaController,LineElement,RadialLinearScale,
   LinearScale);
@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, CommonModule],
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements AfterViewInit {

  categories: string[] = [];
  categoryExpenses: any[] = [];
  totalExpenses: number = 0;
  monthlyExpenses: any[] = [];
  currentMonth: Date = new Date();
  month: string[] = [];
  amount: number[] = [];
  monthlyCategoryExpenses: any[]=[];
  currentMonthSpendings :number=0;
  weeklyCategoryExpenses: any[]=[];
  currentWeek: any[]=[];
  CurrentWeek: any[]=[];
  weeklytotal: number=0;
  category: any[]=[];


  constructor(private expenseService: ExpenseService) {
    // Register Chart.js components
    Chart.register(
      BarElement,
      CategoryScale,
      LinearScale,
      Title,
      Tooltip,
      Legend
    );
  }

  ngAfterViewInit(): void {
    this.fetchTotalExpenses();
    this.fetchMonthlyExpenses();
    this.fetchMonthlyCategoryExpenses();
    this.fetchWeeklyCategoryExpenses();
  }

  fetchTotalExpenses(): void {
    this.expenseService.getTotalExpenses().subscribe({
      next: (data) => {
        this.totalExpenses = data.totalExpenses;
      },
      error: (err) => {
        console.error('Error fetching total expenses:', err);
      }
    });
  }

  fetchMonthlyExpenses(): void {
    const userId = JSON.parse(localStorage.getItem('authUser') || '{}').id;
    this.expenseService.getMonthlyExpenses().subscribe({
      next: (data) => {
        this.monthlyExpenses = data;
        this.month = this.monthlyExpenses.map(expense => new Date(expense.month).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));
        this.amount = this.monthlyExpenses.map(expense => expense.totalamount);

        console.log("monthly expenses", this.monthlyExpenses);
        console.log("months", this.month);
        console.log("amount", this.amount);

        this.FirstChart();
      },
      error: (err) => {
        console.error('Error fetching monthly expenses:', err);
      }
    });
  }

  FirstChart(): void {
    const ctx = document.getElementById("barchart") as HTMLCanvasElement | null;
    if (ctx) {
      new Chart(ctx.getContext('2d')!, {
        type:'bar',
        data: {
          labels: this.month,
          datasets: [{
            label: 'Monthly Expenses',
            data: this.amount,
            backgroundColor:'rgb(158, 114, 183)',
           /* borderColor: 'rgba(75, 192, 192, 1)',rgb(113, 217, 200)*/
            borderWidth: 0.1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top' as const,
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `$${tooltipItem.raw}`;
                }
              }
            }
          },
          scales: {
            x: {
              //stacked: true,
              title: {
                display: true,
                text: 'Month'
              },
              
              
            },
            y: {
              //stacked: true,
              beginAtZero: true,
              title: {
                display: true,
                text: 'Amount'
              }
            }
          }
        }
      });
    } else {
      console.error('Canvas element not found');
    }
  }
  toggleSize(event: Event): void {
    const element = event.currentTarget as HTMLElement;
    element.classList.toggle('clicked');
  }


  fetchMonthlyCategoryExpenses(): void {
    const userId = JSON.parse(localStorage.getItem('authUser') || '{}').id;
    this.expenseService.getMonthlyCategoryExpenses().subscribe({
      next: (data) => {
        this.monthlyCategoryExpenses = data;
        console.log("Monthly expense of each category", data);
        
        // Map the month and prepare data for pie chart
        const currentMonth = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        const filteredExpenses = this.monthlyCategoryExpenses.filter(expense => 
          new Date(expense.month).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) === currentMonth
        );
        
        if (filteredExpenses.length) {
          const categories = filteredExpenses.map(expense => expense.categoryname);
          const amounts = filteredExpenses.map(expense => expense.totalamount);
          console.log(categories);
          console.log(amounts);
          this.currentMonthSpendings=amounts.reduce((accumulateur, valeurCourante) => accumulateur + valeurCourante, 0);
        
          // Create the pie chart with the data for the current month
          this.createPieChart(currentMonth, categories, amounts);
        }
      },
      error: (err) => {
        console.error('Error fetching monthly category expenses:', err);
      }
    });
  }
  
  
  createPieChart(month: string, categories: string[], amounts: number[]): void {
    new Chart('piechart', {
      type: 'doughnut',
      data: {
        labels: categories,
        datasets: [{
          //label:month ,
          data: amounts,
          backgroundColor: 
         /* ['rgb(224, 214, 121)', 'rgb(135, 221, 212)', 'rgb(212, 160, 235)', 'rgb(221, 232, 156)'
            ,'rgb(151, 184, 117)','rgb(184, 117, 148)','rgb(49, 49, 122)','rgb(51, 138, 142)','rgb(166, 211, 163)',' rgb(48, 103, 73)'
          ],*/

          [ 
            'rgb(107, 151, 181)','rgb(65, 145, 107)','rgb(16, 93, 107)',
            'rgb(115, 134, 127)','rgb(113, 100, 134)','rgb(110, 59, 110)',
            'rgb(158, 114, 183)','rgb(139, 202, 139)','rgb(14, 146, 132)'


            ],
            borderWidth:2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
            labels:{
              usePointStyle:true,
            }
          },
          title:{
            display:true ,
            text: 'Current Month Spendings'
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.raw || 0;
                return `${label}: $${value}`;
              }
            }
          }
        }
      }
    });
  }
  fetchWeeklyCategoryExpenses(): void {
    const userId = JSON.parse(localStorage.getItem('authUser') || '{}').id;
    this.expenseService.getWeeklyCategoryExpenses().subscribe({
      next: (data) => {
        this.weeklyCategoryExpenses = data;
        console.log("Weekly expenses of each category", data);
  
        if (this.weeklyCategoryExpenses.length === 0) {
          this.CurrentWeek = []; // Handle the case where there are no weekly expenses
          console.log("No weekly expenses data available.");
          return;
        }
  
        
        this.currentWeek = this.weeklyCategoryExpenses[this.weeklyCategoryExpenses.length - 1].week_start;
      
  
        // Filter out the last week data
        this.CurrentWeek = this.weeklyCategoryExpenses.filter(week => week.week_start === this.currentWeek);
       console.log("Expenses for the last week", this.CurrentWeek);
       this.categories=this.weeklyCategoryExpenses.map(expense =>expense.categoryname);
       this.amount=this.weeklyCategoryExpenses.map(expense =>expense.totalamount);
       this.weeklytotal=this.amount.reduce((pre,next)=>pre+next,0);
       this.createChart(this.categories,this.amount);

      },
      error: (err) => {
        console.error('Error fetching weekly category expenses:', err);
      }
    });
  }
  
  createChart( categories: string[], amounts: number[]): void {
    new Chart('linechart', {
      type: 'line',
      data: {
        labels: categories,
        datasets: [{
          //label:month ,
          data: amounts,
          backgroundColor: 
         

          [ 
            'rgb(107, 151, 181)','rgb(65, 145, 107)','rgb(16, 93, 107)',
            'rgb(115, 134, 127)','rgb(113, 100, 134)','rgb(110, 59, 110)',
            'rgb(158, 114, 183)','rgb(139, 202, 139)','rgb(14, 146, 132)'


            ],
            borderWidth:3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
            labels:{
             usePointStyle:false,
            }
          },
          title:{
            display:true ,
            text: 'Current Week Spendings'
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.raw || 0;
                return `${label}: $${value}`;
              }
            }
          }
        }
      }
    });
  }
  
}


