import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from "@angular/core";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

@Component({
  selector: "app-population-chart",
  imports: [],
  templateUrl: "./population-chart.html",
  styleUrl: "./population-chart.css",
})
export class PopulationChart implements OnChanges, AfterViewInit {
  @Input() rabbits: number[] = [];
  @Input() wolves: number[] = [];
  @Input() carrots: number[] = [];

  @ViewChild("canvas") canvasRef!: ElementRef;
  private chart?: Chart;

  ngAfterViewInit() {
    this.createChart();
  }

  ngOnChanges() {
    if (this.chart) {
      this.updateChart();
    }
  }

  private createChart() {
    this.chart = new Chart(this.canvasRef.nativeElement, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          { label: "Rabbits", data: [], borderColor: "#34d399", backgroundColor: "transparent" },
          { label: "Wolves", data: [], borderColor: "#f87171", backgroundColor: "transparent" },
          { label: "Carrots", data: [], borderColor: "#fb923c", backgroundColor: "transparent" },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: "#6b7280" },
            grid: { color: "#1f2937" },
          },
          x: {
            ticks: { color: "#6b7280" },
            grid: { color: "#1f2937" },
          },
        },
        plugins: {
          legend: {
            labels: { color: "#6b7280" },
          },
        },
      },
    });
  }

  private updateChart() {
    this.chart!.data.labels = this.rabbits.map((_, i) => i.toString());
    this.chart!.data.datasets[0].data = this.rabbits;
    this.chart!.data.datasets[1].data = this.wolves;
    this.chart!.data.datasets[2].data = this.carrots;
    this.chart!.update();
  }
}
