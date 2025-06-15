import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { NextRequest, NextResponse } from "next/server";
import { error } from "console";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log("SESSSSION", session.accessToken);

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
      "http://localhost:8080/startups/today-picks",
      requestOptions
    );
    const data = await response.json();
    console.log("today's", data);
    return NextResponse.json({ result: data }, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Failed to fetch today's picks" },
      { status: 500 }
    );
  }
}
