import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `https://sandbox-api.dev.codeyoung.com/noah/topic/assigned?studentId=aaryan_dev_1`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
