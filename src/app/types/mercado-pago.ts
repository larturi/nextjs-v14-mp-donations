export interface MercadoPagoWebhookResponse {
  action: string;
  api_version: string;
  data: Data;
  date_created: string;
  id: string;
  live_mode: boolean;
  type: string;
  user_id: number;
}

export interface Data {
  id: string;
}
