FROM node:24-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yml ./

RUN pnpm install --prod --frozen-lockfile

COPY . . 

EXPOSE 4001

CMD ["pnpm", "start"]