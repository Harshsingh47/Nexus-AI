import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: 'execution-stream'
})
@Injectable()
export class ObservabilityGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`[ObservabilityGateway] Client connected: ${client.id}`);
    client.emit('connected', { status: 'OK', socketId: client.id, timestamp: Date.now() });
  }

  handleDisconnect(client: Socket) {
    console.log(`[ObservabilityGateway] Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('subscribe_execution')
  handleSubscribeExecution(@MessageBody() data: { executionId: string }, @ConnectedSocket() client: Socket) {
    client.join(data.executionId);
    return { event: 'subscribed', executionId: data.executionId };
  }

  emitExecutionStep(executionId: string, step: any) {
    if (this.server) {
      this.server.to(executionId).emit('execution_step', step);
      this.server.emit('global_execution_step', step);
    }
  }

  emitExecutionStatus(executionId: string, statusData: any) {
    if (this.server) {
      this.server.to(executionId).emit('execution_status', statusData);
    }
  }
}
