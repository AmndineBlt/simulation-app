import { Module } from "@nestjs/common";
import { SimulationService } from "./simulation.service";
import { SimulationGateway } from "./gateway/simulation.gateway";

@Module({
  providers: [SimulationService, SimulationGateway],
})
export class SimulationModule {}
