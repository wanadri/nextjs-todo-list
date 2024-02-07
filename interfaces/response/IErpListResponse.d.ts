interface IErpListResponse {
  slug: string;
  title: string;
  title_ms: string;
  is_water_rationing: boolean;
  erp_code: string;
  color: number;
  color_name: string;
  type: number;
  type_name: string;
  activated_at: string;
  ration_end_at: string | null;
  work_start_date: string | null;
  work_start_date_formatted: string | null;
  activated_at_formatted: string;
  visibilities: {
    module: string;
    enabled: boolean;
  }[];
  attachments: any[];
  regions: {
    id: number;
    region: string;
    code: string;
    is_region: number;
  }[];
}