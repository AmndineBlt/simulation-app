import { OnGatewayInit, WebSocketGateway, WebSocketServer, } from "@nestjs/websockets";
import { Server } from "socket.io";
import { SimulationService } from "../simulation.service";
import { setInterval } from "node:timers";
import { Grid } from "../types/grid.type";

@WebSocketGateway({ cors: { origin: "*" } })
export class SimulationGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(private simulationService: SimulationService) {}

  afterInit() {
    console.log("Gateway initialisé !");
    this.startSimulation();
  }

  startSimulation() {
    this.simulationService.init();
    setInterval(() => {
      const grid: Grid = this.simulationService.tick();
      this.server.emit("grid", grid);
    }, 1000);
  }
}
