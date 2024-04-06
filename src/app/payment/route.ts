import type {NextRequest} from "next/server";
import type {MercadoPagoWebhookResponse} from "../types/mercado-pago";

import {MercadoPagoConfig, Payment} from "mercadopago";

const mercadopago = new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN!});

export async function POST(request: NextRequest) {
  const body = (await request.json()) as MercadoPagoWebhookResponse;

  /** En production agregar esta validacion **/
  // const secret = request.headers.get("x-signature-id");
  // if (secret !== process.env.MP_SECRET_WEBHOOK) return Response.json({success: false});

  const payment = await new Payment(mercadopago).get({id: body.data.id});

  const donation = {
    id: payment.id,
    amount: payment.transaction_amount,
    message: payment.description,
  };

  return Response.json({success: true});
}
