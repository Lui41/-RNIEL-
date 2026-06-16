// src/modules/route-engine/constants/route-keywords.constants.ts

import { RouteType } from '../enums/route.enum';

export const ROUTE_KEYWORDS: Record<
  RouteType,
  string[]
> = {
  [RouteType.IDEA_NEGOCIO]: [
    'idea',
    'emprender',
    'startup',
    'nuevo negocio',
    'validar',
  ],

  [RouteType.NEGOCIO_EXISTENTE]: [
    'empresa',
    'ventas',
    'clientes',
    'facturacion',
    'negocio actual',
  ],

  [RouteType.INVERSION]: [
    'invertir',
    'inversion',
    'acciones',
    'rentabilidad',
    'capital',
    'retorno',
  ],

  [RouteType.ACTIVO_DIGITAL]: [
    'web',
    'app',
    'saas',
    'trafico',
    'seo',
    'usuarios',
  ],

  [RouteType.FRANQUICIA]: [
    'franquicia',
    'royalties',
    'canon',
  ],

  [RouteType.EXPANSION]: [
    'expandir',
    'expansion',
    'nueva sede',
    'nuevo mercado',
  ],

  [RouteType.COMPRA_EMPRESA]: [
    'comprar empresa',
    'adquisicion',
    'due diligence',
  ],

  [RouteType.COMPARACION]: [
    'comparar',
    'comparacion',
    'alternativas',
  ],
};