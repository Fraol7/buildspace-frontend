import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + session.accessToken);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  console.log("Authorization header:", myHeaders.get("Authorization"));

  try {
    const response = await fetch(
      "http://localhost:8080/my-startups",
      requestOptions
    );
    const data = await response.json();
    console.log("my startups", data);
    return NextResponse.json({ result: data }, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Failed to fetch my startups" },
      { status: 500 }
    );
  }
}
