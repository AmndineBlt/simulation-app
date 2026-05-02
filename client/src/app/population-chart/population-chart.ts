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
          { label: "Lapins", data: [], borderColor: "green" },
          { label: "Loups", data: [], borderColor: "red" },
          { label: "Carottes", data: [], borderColor: "orange" },
        ],
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
