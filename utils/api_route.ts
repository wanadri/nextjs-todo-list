const route = {
  auth: {
    token: '/token',
    refresh_token: '/token_refresh',
  },
  erp: {
    list: '/erp/list',
    region_polygon: '/polygon/region',
    area_polygon_path: '/erp/:erp_id/polygon/area-path'
  },
}

export default route;