# Getting Started with nextjs-mp-donations

PoC donaciones con Mercado Pago y Next.js

## Tecnologies

- Next 14
- Node 20
- SDK Mercado Pago <https://www.mercadopago.com.ar/developers>

### Necesitamos una Url publica para Mercado Pago

```bash
brew install cloudflared

cloudflared tunnel --url http://localhost:3000
```

### Run the development server

```bash
nvm use 20

pnpm dev
```

### Tarjetas de Prueba MP

<https://www.mercadopago.com.ar/developers/panel/app/3724259136764428/test-cards>

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
