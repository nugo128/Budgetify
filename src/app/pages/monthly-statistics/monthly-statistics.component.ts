import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StatisticService } from '../../services/statistic.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-monthly-statistics',
  templateUrl: './monthly-statistics.component.html',
  styleUrl: './monthly-statistics.component.css',
})
export class MonthlyStatisticsComponent implements OnInit, OnDestroy {
  dataSource: any;
  displayedColumns: string[] = [
    'Month',
    'Income',
    'Expenses',
    'Economy',
    '% of economy',
  ];
  statistic: FormGroup;
  entries: any = [];
  monthlyData: any = {};
  monthlyDataArray: any = [];
  totalData: any = {};
  averageData: any = {};
  chartDom;
  myChart;
  option = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {},
    xAxis: {
      type: 'category',
      boundaryGap: ['10%', '10%'],
      data: [],
      offset: -120,
      axisLabel: {
        interval: 0,
        padding: [0, -20, 0, 0],
      },
    },
    yAxis: {
      type: 'value',
      name: '$        ',
      nameGap: 15,
      axisLine: {
        symbol: ['none', 'arrow'],
        symbolSize: [8, 8],
        symbolOffset: [5, 5],
        show: true,
        lineStyle: {
          color: 'gray',
        },
      },
    },
    series: [
      {
        name: 'Income',
        type: 'line',
        data: [],
      },
      {
        name: 'Expenses',
        type: 'line',
        data: [],
      },
      {
        name: 'Economy',
        type: 'line',
        data: [],
      },
    ],
  };

  constructor(
    public fb: FormBuilder,
    public statisticService: StatisticService
  ) {
    this.statistic = this.fb.group({
      date_from: '9/9/2023',
      date_to: '3/3/2024',
    });
  }
  categorizeEntries() {
    const result = {
      income: [],
      expenses: [],
    };

    this.entries.forEach((entry) => {
      if (entry.transaction_type === 'Income') {
        result.income.push(entry);
      } else {
        result.expenses.push(entry);
      }
    });

    return result;
  }

  ngOnDestroy(): void {
    this.myChart.dispose();
  }
  groupByMonth() {
    const grouped = {};

    this.entries.forEach((entry) => {
      const monthYear = entry.date?.substring(0, 7);

      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      grouped[monthYear].push(entry);
    });

    return grouped;
  }

  calculateTotalsAndPercentage() {
    for (const monthYear in this.monthlyData) {
      const monthEntries = this.monthlyData[monthYear];

      const totalIncome = monthEntries
        .filter((entry) => entry.transaction_type === 'Income')
        .reduce((sum, entry) => sum + entry.amount, 0);

      const totalExpenses = monthEntries
        .filter((entry) => entry.transaction_type !== 'Income')
        .reduce((sum, entry) => sum + entry.amount, 0);

      const economy = totalIncome - totalExpenses;
      const percentage = totalIncome !== 0 ? (economy / totalIncome) * 100 : 0;

      const formattedData = {
        date: monthYear,
        totalIncome,
        totalExpenses,
        economy,
        percentage: percentage.toFixed(2),
      };
      if (formattedData.date !== 'undefined') {
        this.monthlyDataArray.push(formattedData);
      }
    }

    this.totalData = this.calculateTotalValues(this.monthlyDataArray);

    this.averageData = this.calculateAverageValues(
      this.monthlyDataArray.length
    );
    this.totalData.date = 'Total';
    this.averageData.date = 'Average';
    const avgPercentage =
      this.averageData.totalIncome !== 0
        ? (this.averageData.economy / this.averageData.totalIncome) * 100
        : 0;

    const totalPercentage =
      this.totalData.totalIncome !== 0
        ? (this.totalData.economy / this.totalData.totalIncome) * 100
        : 0;

    this.averageData.percentage = avgPercentage;
    this.totalData.percentage = totalPercentage;
    this.monthlyDataArray.push(this.totalData);
    this.monthlyDataArray.push(this.averageData);
    this.monthlyDataArray.sort((a: any, b: any) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    this.dataSource = this.monthlyDataArray;
    console.log(this.dataSource);
    this.monthlyDataArray.map((data) => {
      if (data.date !== 'Total' && data.date !== 'Average') {
        const [year, month] = data.date.split('-');
        this.option.xAxis.data.push(
          new Intl.DateTimeFormat('en-US', {
            month: 'long',
            year: 'numeric',
          }).format(new Date(`${year}-${month}`))
        );
        this.option.series[0].data.push(data.totalIncome);
        this.option.series[1].data.push(data.totalExpenses);
        this.option.series[2].data.push(data.economy);
      }
    });
    this.myChart.setOption(this.option);
  }
  calculateTotalValues(dataArray: any[]) {
    const totalValues = {};

    dataArray.forEach((data) => {
      for (const key in data) {
        if (totalValues[key] === undefined) {
          totalValues[key] = 0;
        }
        totalValues[key] += data[key];
      }
    });

    return totalValues;
  }

  calculateAverageValues(totalEntries: number) {
    const averageValues = {};

    for (const key in this.totalData) {
      averageValues[key] = this.totalData[key] / totalEntries;
    }

    return averageValues;
  }
  ngOnInit(): void {
    this.chartDom = document.getElementById('chart');
    this.myChart = echarts.init(this.chartDom);
    this.statisticService.get(this.statistic.value).subscribe((response) => {
      this.entries = response;
      this.monthlyData = this.groupByMonth();
      this.calculateTotalsAndPercentage();
    });
  }
  formData: any;
  dateChanged(start: string, end: string): void {
    this.myChart.clear();
    this.formData = this.statistic.value;
    this.formData.date_from = start;
    this.formData.date_to = end;
    if (this.formData.date_from && this.formData.date_to) {
      this.option.xAxis.data = [];
      this.option.series[0].data = [];
      this.option.series[1].data = [];
      this.option.series[2].data = [];
      this.statisticService.get(this.formData).subscribe((response) => {
        this.entries = [];
        this.monthlyDataArray = [];
        this.entries = response;
        this.monthlyData = this.groupByMonth();
        this.calculateTotalsAndPercentage();
      });
    }
  }
}
