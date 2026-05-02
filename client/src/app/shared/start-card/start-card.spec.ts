import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StartCard } from "./start-card";

describe("StartCard", () => {
  let component: StartCard;
  let fixture: ComponentFixture<StartCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartCard],
    }).compileComponents();

    fixture = TestBed.createComponent(StartCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
