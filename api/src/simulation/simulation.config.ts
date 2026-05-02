export interface SimulationConfig {
  gridSize: number;
  rabbitCount: number;
  wolfCount: number;
  carrotCount: number;
  rabbitReproductionRate: number;
  wolfReproductionRate: number;
  maxCarrots: number;
}

export const DEFAULT_CONFIG: SimulationConfig = {
  gridSize: 10,
  rabbitCount: 5,
  wolfCount: 2,
  carrotCount: 10,
  rabbitReproductionRate: 0.4,
  wolfReproductionRate: 0.2,
  maxCarrots: 20,
};
