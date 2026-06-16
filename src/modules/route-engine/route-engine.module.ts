// src/modules/route-engine/route-engine.module.ts

import { Module } from '@nestjs/common';

import { RouteEngineController } from './route-engine.controller';
import { RouteEngineService } from './route-engine.service';
import { RouteClassifierService } from './services/route-classifier.service';

@Module({
  controllers: [RouteEngineController],
  providers: [
    RouteEngineService,
    RouteClassifierService,
  ],
  exports: [
    RouteEngineService,
  ],
})
export class RouteEngineModule {}