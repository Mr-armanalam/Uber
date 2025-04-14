import { neon } from "@neondatabase/serverless";
// import { config } from 'dotenv';

// config({ path: './.env' });

export async function POST(req: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const { name, email, clerkId } = await req.json();

    if (!name || !email || !clerkId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const response = await sql`
    INSERT INTO users (name, email, clerk_id)
    VALUES (${name}, ${email}, ${clerkId})`;

    return new Response(JSON.stringify({ data: response }), { status: 201 });
  } catch (error:any) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500 }
    );
    
  }
}
