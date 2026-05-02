import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SimulationOver } from "./simulation-over";

describe("SimulationOver", () => {
  let component: SimulationOver;
  let fixture: ComponentFixture<SimulationOver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationOver],
    }).compileComponents();

    fixture = TestBed.createComponent(SimulationOver);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
