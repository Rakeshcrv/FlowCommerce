// Architecture graph + demo scenarios for the FlowCommerce AI visualizer.
export type NodeKind =
  | "edge"
  | "network"
  | "gateway"
  | "service"
  | "data"
  | "stream"
  | "observability";

export interface ArchNode {
  id: string;
  label: string;
  sub?: string;
  kind: NodeKind;
  x: number; // 0-100
  y: number; // 0-100
  color?: "cyan" | "violet" | "lime" | "amber" | "rose";
  latency?: number;
  rps?: number;
}

export interface ArchEdge {
  from: string;
  to: string;
}

export const NODES: ArchNode[] = [
  { id: "user", label: "User", sub: "browser · mobile", kind: "edge", x: 4, y: 50, color: "cyan" },
  { id: "dns", label: "Route53", sub: "dns", kind: "network", x: 14, y: 22, color: "cyan" },
  { id: "cdn", label: "CloudFront", sub: "cdn · waf", kind: "network", x: 14, y: 78, color: "cyan" },
  { id: "alb", label: "ALB", sub: "load balancer", kind: "network", x: 26, y: 50, color: "cyan" },
  { id: "ingress", label: "K8s Ingress", sub: "nginx", kind: "network", x: 37, y: 50, color: "cyan" },
  { id: "gateway", label: "API Gateway", sub: "envoy · rate limit", kind: "gateway", x: 48, y: 50, color: "violet" },
  { id: "auth", label: "Auth", sub: "jwt · oauth", kind: "service", x: 60, y: 12, color: "violet" },
  { id: "catalog", label: "Catalog", sub: "products", kind: "service", x: 60, y: 28, color: "lime" },
  { id: "search", label: "Search", sub: "elastic", kind: "service", x: 60, y: 44, color: "lime" },
  { id: "cart", label: "Cart", sub: "sessions", kind: "service", x: 60, y: 60, color: "amber" },
  { id: "order", label: "Order", sub: "checkout", kind: "service", x: 60, y: 76, color: "amber" },
  { id: "payment", label: "Payment", sub: "stripe · 3ds", kind: "service", x: 60, y: 92, color: "rose" },
  { id: "inventory", label: "Inventory", sub: "stock", kind: "service", x: 74, y: 20, color: "lime" },
  { id: "shipping", label: "Shipping", sub: "labels", kind: "service", x: 74, y: 36, color: "amber" },
  { id: "notify", label: "Notification", sub: "email · sms", kind: "service", x: 74, y: 52, color: "violet" },
  { id: "recs", label: "Recommender", sub: "ml", kind: "service", x: 74, y: 68, color: "violet" },
  { id: "analytics", label: "Analytics", sub: "clickstream", kind: "service", x: 74, y: 84, color: "cyan" },
  { id: "kafka", label: "Kafka", sub: "8 topics", kind: "stream", x: 87, y: 30, color: "amber" },
  { id: "redis", label: "Redis", sub: "cache", kind: "data", x: 87, y: 46, color: "rose" },
  { id: "postgres", label: "Postgres", sub: "RDS · primary", kind: "data", x: 87, y: 62, color: "cyan" },
  { id: "s3", label: "S3", sub: "object store", kind: "data", x: 87, y: 78, color: "lime" },
  { id: "otel", label: "OpenTelemetry", sub: "traces · metrics · logs", kind: "observability", x: 96, y: 50, color: "violet" },
];

export const EDGES: ArchEdge[] = [
  { from: "user", to: "dns" },
  { from: "user", to: "cdn" },
  { from: "dns", to: "alb" },
  { from: "cdn", to: "alb" },
  { from: "alb", to: "ingress" },
  { from: "ingress", to: "gateway" },
  { from: "gateway", to: "auth" },
  { from: "gateway", to: "catalog" },
  { from: "gateway", to: "search" },
  { from: "gateway", to: "cart" },
  { from: "gateway", to: "order" },
  { from: "gateway", to: "payment" },
  { from: "catalog", to: "inventory" },
  { from: "order", to: "inventory" },
  { from: "order", to: "shipping" },
  { from: "order", to: "notify" },
  { from: "cart", to: "recs" },
  { from: "catalog", to: "recs" },
  { from: "order", to: "analytics" },
  { from: "inventory", to: "kafka" },
  { from: "order", to: "kafka" },
  { from: "payment", to: "kafka" },
  { from: "cart", to: "redis" },
  { from: "auth", to: "redis" },
  { from: "catalog", to: "postgres" },
  { from: "order", to: "postgres" },
  { from: "payment", to: "postgres" },
  { from: "catalog", to: "s3" },
  { from: "analytics", to: "s3" },
  { from: "notify", to: "kafka" },
  { from: "auth", to: "otel" },
  { from: "gateway", to: "otel" },
  { from: "order", to: "otel" },
  { from: "payment", to: "otel" },
];

export interface Scenario {
  id: string;
  label: string;
  description: string;
  color: "cyan" | "violet" | "lime" | "amber" | "rose";
  path: string[]; // node ids in order
  logs: { svc: string; msg: string }[];
}

export const SCENARIOS: Scenario[] = [
  {
    id: "login",
    label: "Log in",
    description: "User authenticates. JWT is minted and cached in Redis.",
    color: "violet",
    path: ["user", "cdn", "alb", "ingress", "gateway", "auth", "redis", "otel"],
    logs: [
      { svc: "gateway", msg: "POST /auth/login · 12ms · 200" },
      { svc: "auth", msg: "verify(email) · bcrypt · 38ms" },
      { svc: "redis", msg: "SET session:tok_… ttl=3600" },
      { svc: "otel", msg: "trace 7f3a… span=auth.login ok" },
    ],
  },
  {
    id: "search",
    label: "Search product",
    description: "Query fans out to Elastic and warm cache.",
    color: "lime",
    path: ["user", "cdn", "alb", "ingress", "gateway", "search", "redis", "postgres"],
    logs: [
      { svc: "gateway", msg: "GET /search?q=headphones · 9ms" },
      { svc: "search", msg: "elastic.query · 42 hits · 18ms" },
      { svc: "redis", msg: "GET popularity:headphones HIT" },
    ],
  },
  {
    id: "cart",
    label: "Add to cart",
    description: "Cart mutation, Redis session, recommendation refresh.",
    color: "amber",
    path: ["user", "cdn", "alb", "ingress", "gateway", "cart", "redis", "recs", "kafka"],
    logs: [
      { svc: "gateway", msg: "POST /cart/items · 11ms" },
      { svc: "cart", msg: "cart.add sku=SKU-882 qty=1" },
      { svc: "redis", msg: "HSET cart:u_2091 sku=SKU-882" },
      { svc: "kafka", msg: "cart.updated offset=88214 partition=3" },
    ],
  },
  {
    id: "checkout",
    label: "Checkout",
    description: "Full path: inventory reservation → payment → order → notification.",
    color: "rose",
    path: [
      "user", "cdn", "alb", "ingress", "gateway",
      "cart", "inventory", "payment", "order",
      "postgres", "kafka", "notify", "shipping", "otel",
    ],
    logs: [
      { svc: "gateway", msg: "POST /orders/checkout · 87ms · 201" },
      { svc: "inventory", msg: "reserve sku=SKU-882 qty=1 ok" },
      { svc: "payment", msg: "charge $249.00 · 3ds passed" },
      { svc: "order", msg: "INSERT INTO orders(user_id,total) 9.1ms" },
      { svc: "kafka", msg: "order.created offset=44210 partition=2" },
      { svc: "notify", msg: "email queued to sqs" },
      { svc: "shipping", msg: "label lot=USPS-19a printed" },
      { svc: "otel", msg: "trace 44d1… 14 spans · 87ms total" },
    ],
  },
  {
    id: "register",
    label: "User Registration",
    description: "New account: gateway → auth → postgres → email verification.",
    color: "cyan",
    path: [
      "user", "cdn", "alb", "ingress", "gateway",
      "auth", "postgres", "notify", "kafka", "otel",
    ],
    logs: [
      { svc: "gateway", msg: "POST /auth/register · 22ms · 201" },
      { svc: "auth", msg: "hash(password) · argon2id · 62ms" },
      { svc: "postgres", msg: "INSERT INTO users(email,hash) 7.3ms" },
      { svc: "notify", msg: "email verify link → ses queued" },
      { svc: "kafka", msg: "user.created offset=19022 partition=1" },
      { svc: "otel", msg: "trace 9c02… span=auth.register ok" },
    ],
  },
];
