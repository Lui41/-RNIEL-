// src/modules/route-engine/route-engine.service.ts

import { Injectable } from '@nestjs/common';

import { RouteInputDto } from './dto/route-input.dto';
import { RouteClassifierService } from './services/route-classifier.service';

@Injectable()
export class RouteEngineService {
  constructor(
    private readonly classifier: RouteClassifierService,
  ) {}

  detectRoute(
    dto: RouteInputDto,
  ) {
    return this.classifier.classify(dto);
  }
}