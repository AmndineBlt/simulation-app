import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SimulationGrid } from "./simulation-grid";

describe("SimulationGrid", () => {
  let component: SimulationGrid;
  let fixture: ComponentFixture<SimulationGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(SimulationGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
