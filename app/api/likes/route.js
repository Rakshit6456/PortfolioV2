import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const SET = "portfolio:likers";
const COOKIE = "visitor";

// one Redis command over Upstash's REST api
async function redis(...cmd) {
  const res = await fetch(URL_, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify(cmd),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`redis ${res.status}`);
  return (await res.json()).result;
}

const off = () => Response.json({ count: null, liked: false });

export async function GET() {
  if (!URL_ || !TOKEN) return off();
  try {
    const id = (await cookies()).get(COOKIE)?.value;
    const [count, liked] = await Promise.all([
      redis("SCARD", SET),
      id ? redis("SISMEMBER", SET, id) : 0,
    ]);
    return Response.json({ count, liked: liked === 1 });
  } catch {
    return off();
  }
}

export async function POST() {
  if (!URL_ || !TOKEN) return off();
  try {
    const store = await cookies();
    const id = store.get(COOKIE)?.value || crypto.randomUUID();
    store.set(COOKIE, id, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
    // SADD returns 0 when this visitor already liked, so repeats never count
    await redis("SADD", SET, id);
    return Response.json({ count: await redis("SCARD", SET), liked: true });
  } catch {
    return off();
  }
}
