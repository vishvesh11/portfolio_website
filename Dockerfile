
FROM node:22-alpine AS builder


WORKDIR /app


RUN npm install -g pnpm


COPY package.json pnpm-lock.yaml ./


RUN pnpm install --frozen-lockfile


COPY . .


RUN pnpm build


FROM node:22-alpine AS runner


WORKDIR /app

RUN addgroup --system --gid 1001 nextjs && adduser --system --uid 1001 nextjs


COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules


# Set permissions for the non-root user.
RUN chown -R nextjs:nextjs /app
USER nextjs
EXPOSE 3000



CMD ["node", "server.js"]