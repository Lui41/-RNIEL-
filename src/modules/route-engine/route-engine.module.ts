// src/modules/route-engine/route-engine.module.ts
import { Module } from '@nestjs/common';
import { RouteEngineController } from './route-engine.controller';
import { RouteEngineService } from './route-engine.service';

@Module({
  controllers: [RouteEngineController],
  providers: [RouteEngineService],
  exports: [RouteEngineService],
})
export class RouteEngineModule {}