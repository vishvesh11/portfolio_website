
FROM node:22-alpine AS builder


WORKDIR /app


RUN npm install -g pnpm


COPY package.json pnpm-lock.yaml ./


RUN pnpm install --frozen-lockfile


COPY . .


RUN pnpm build


FROM node:22-alpine AS runner


WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nextjs && adduser --system --uid 1001 nextjs

# Copy only the standalone output (includes minimal node_modules + server.js)
COPY --from=builder /app/.next/standalone ./
# Copy static assets (JS/CSS chunks)
COPY --from=builder /app/.next/static ./.next/static
# Copy public assets
COPY --from=builder /app/public ./public


# Set permissions for the non-root user.
RUN chown -R nextjs:nextjs /app
USER nextjs
EXPOSE 3000

ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

CMD ["node", "server.js"]