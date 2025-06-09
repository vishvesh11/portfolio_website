
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy pnpm-lock.yaml and package.json to leverage Docker cache
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile --prod

COPY . .

RUN pnpm build


FROM node:20-alpine AS runner

ENV NODE_ENV production
ENV PORT 3000 # <--- IMPORTANT: Next.js will listen on this port

RUN addgroup --system --gid 1001 nextjs && adduser --system --uid 1001 nextjs

WORKDIR /app


COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static 

RUN chown -R nextjs:nextjs /app
USER nextjs

EXPOSE 3000 

CMD ["node", "server.js"]