import { OnGatewayConnection, OnGatewayInit, WebSocketGateway, WebSocketServer, } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { SimulationService } from "../simulation.service";
import { setInterval } from "node:timers";
import { Grid } from "../types/grid.type";

@WebSocketGateway({ cors: { origin: "*" } })
export class SimulationGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private simulationService: SimulationService) {}

  afterInit() {
    console.log("Gateway initialisé !");
    this.startSimulation();
  }

  startSimulation() {
    setInterval(() => {
      const grid: Grid = this.simulationService.tick();
      this.server.emit("grid", grid);
    }, 1000);
  }

  handleConnection(client: Socket) {
    console.log("Client connecté !");
    this.simulationService.init(); // réinitialise à chaque connexion
  }
}
