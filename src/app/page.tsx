import {MercadoPagoConfig, Preference} from "mercadopago";
import {redirect} from "next/navigation";

import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

const clientMP = new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN!});

export default function HomePage() {
  async function donate(formData: FormData) {
    "use server";

    const preferenceMP = await new Preference(clientMP).create({
      body: {
        items: [
          {
            id: "donation",
            title: formData.get("message") as string,
            quantity: 1,
            unit_price: Number(formData.get("amount")),
          },
        ],
      },
    });

    redirect(preferenceMP.sandbox_init_point!);
  }

  return (
    <form action={donate} className="m-auto grid max-w-[500px] gap-6 border p-4">
      <Label className="grid gap-2">
        <span>Valor</span>
        <Input name="amount" type="number" />
      </Label>

      <Label className="grid gap-2">
        <span>Tu mensaje en la donación</span>
        <Textarea name="message" />
      </Label>

      <Button type="submit">Enviar</Button>
    </form>
  );
}
