import { Routes } from "@angular/router";
import { Home } from "./features/home/home";
import { Simulation } from "./features/predator-prey/simulation/simulation";

export const routes: Routes = [
  { path: "", component: Home },
  { path: "simulation/predator-prey", component: Simulation },
];
