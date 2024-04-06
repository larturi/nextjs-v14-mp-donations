import {MercadoPagoConfig, Preference} from "mercadopago";
import {createClient} from "@supabase/supabase-js";
import {redirect} from "next/navigation";

import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

const clientMP = new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN!});
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET!);

export default async function HomePage() {
  const donations = await supabase
    .from("donations")
    .select("*")
    .then(
      ({data}) =>
        data as unknown as Promise<
          {id: number; created_at: number; amount: number; message: string}[]
        >,
    );

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
    <>
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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cantidad</TableHead>
            <TableHead className="text-right">Mensaje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {donations.map((donation) => {
            return (
              <TableRow key={donation.id}>
                <TableCell className="font-bold">
                  {donation.amount.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </TableCell>
                <TableCell className="text-right">{donation.message}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
