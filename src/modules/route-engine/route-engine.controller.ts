// src/modules/route-engine/route-engine.controller.ts

import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { RouteInputDto } from './dto/route-input.dto';
import { RouteEngineService } from './route-engine.service';

@Controller('routes')
export class RouteEngineController {
  constructor(
    private readonly routeEngineService: RouteEngineService,
  ) {}

  @Post('detect')
  detectRoute(
    @Body() dto: RouteInputDto,
  ) {
    return this.routeEngineService.detectRoute(
      dto,
    );
  }
}