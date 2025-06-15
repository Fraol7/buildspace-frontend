import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { NextRequest, NextResponse } from "next/server";
import { error } from "console";

export async function GET(req: NextRequest) {
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

  try {
    const response = await fetch(
      "http://localhost:8080/user/me",
      requestOptions
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch user data");
    }
    console.log("me", data);
    return NextResponse.json({ result: data }, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
