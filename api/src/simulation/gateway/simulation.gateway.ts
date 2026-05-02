import {
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { SimulationService } from "../simulation.service";
import { setInterval } from "node:timers";
import { Grid } from "../types/grid.type";

@WebSocketGateway({ cors: { origin: "*" } })
export class SimulationGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  private intervalId?: NodeJS.Timeout;

  constructor(private simulationService: SimulationService) {}

  afterInit() {
    // console.log("Gateway initialisé !");
    this.startSimulation();
  }

  startSimulation() {
    this.intervalId = setInterval(() => {
      const grid: Grid = this.simulationService.tick();
      this.server.emit("grid", grid);
    }, 1000);
  }

  handleConnection(client: Socket) {
    // console.log("Client connecté !");
    this.simulationService.init(); // réinitialise à chaque connexion
  }

  @SubscribeMessage("restart")
  handleRestart(): void {
    // console.log("restart reçu !");
    this.simulationService.init();
  }

  @SubscribeMessage("pause")
  handlePause(): void {
    // console.log("pause reçu !");
    clearInterval(this.intervalId);
  }

  @SubscribeMessage("resume")
  handleResume(): void {
    // console.log("resume reçu !");
    this.startSimulation();
  }
}
