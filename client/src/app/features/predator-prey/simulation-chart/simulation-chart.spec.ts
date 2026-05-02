import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SimulationChart } from "./simulation-chart";

describe("SimulationChart", () => {
  let component: SimulationChart;
  let fixture: ComponentFixture<SimulationChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationChart],
    }).compileComponents();

    fixture = TestBed.createComponent(SimulationChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
