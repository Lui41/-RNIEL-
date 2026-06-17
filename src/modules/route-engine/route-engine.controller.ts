// src/modules/route-engine/route-engine.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { RouteEngineService } from './route-engine.service';
import { DetectRouteDto } from './dto/detect-route.dto';

@Controller('routes')
export class RouteEngineController {
  constructor(private readonly routeEngineService: RouteEngineService) {}

  @Get()
  getRoutes() {
    return this.routeEngineService.getAvailableRoutes();
  }

  @Post('detect')
  detect(@Body() dto: DetectRouteDto) {
    return this.routeEngineService.detectRoute(dto);
  }
}