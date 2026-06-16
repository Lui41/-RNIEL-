import { RouteType } from '../enums/route.enum';

export class Analysis {
  id: string;
  companyId?: string;

  route?: RouteType;

  score?: number;

  confidence?: number;

  createdAt: Date;
  updatedAt: Date;
}