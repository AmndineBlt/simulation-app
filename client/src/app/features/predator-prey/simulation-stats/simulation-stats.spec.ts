import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SimulationStats } from "./simulation-stats";

describe("SimulationStats", () => {
  let component: SimulationStats;
  let fixture: ComponentFixture<SimulationStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationStats],
    }).compileComponents();

    fixture = TestBed.createComponent(SimulationStats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
