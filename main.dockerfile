FROM node:18.19.0-alpine

ARG NEXT_PUBLIC_RAILWAY_URL NEXT_PUBLIC_POCKETBASE_URL NEXT_PUBLIC_RAILWAY_URL NEXT_PUBLIC_SUPABASE_ANON_KEY NEXT_PUBLIC_SUPABASE_URL

RUN apk add --no-cache openssl build-base python3 vips-dev && \
    npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm i --frozen-lockfile

COPY . ./

RUN pnpm run build

CMD pnpm run start