import { SimulationEngine } from "./simulation.engine";
import { Rabbit } from "../entities/classes/rabbit.class";
import { MovementRule } from "../rules/movement.rule";
import { Entity } from "../entities/interfaces/entity.interface";

describe("SimulationEngine", () => {
  it("devrait placer un lapin sur la grille", () => {
    // 1. Arrange — prépare les données
    const engine = new SimulationEngine([]);
    engine.init(3, 3);

    // 2. Act — exécute l'action
    engine.placeEntity(new Rabbit({ x: 1, y: 1 }), 1, 1);

    // 3. Assert — vérifie le résultat
    expect(engine.grid[1][1]).toBeInstanceOf(Rabbit);
  });

  it("devrait créer une grille vide après init", () => {
    // 1. Arrange
    const engine = new SimulationEngine([]);

    // 2. Act
    engine.init(3, 3);

    // 3. Assert — comment vérifier que toutes les cases sont null ?
    expect(engine.grid).toEqual([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
  });

  it("devrait déplacer un lapin après un tick", () => {
    // 1. Arrange
    const engine = new SimulationEngine([new MovementRule()]);
    engine.init(3, 3);
    engine.placeEntity(new Rabbit({ x: 1, y: 1 }), 1, 1);

    // 2. Act
    engine.tick();

    // 3. Assert — que veux-tu vérifier ici ?
    expect(engine.grid[1][1]).toBeNull();
    // Astuce — aplatir la grille 2D en tableau 1D
    const allCells: (Entity | null)[] = engine.grid.flat();
    // puis chercher un Rabbit dedans
    expect(allCells.some((cell: Entity | null) => cell instanceof Rabbit)).toBe(
      true,
    );
  });
});
