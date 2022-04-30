import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getUserById } from "~/utils/user.server";

import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request, params }) => {
  const { userId } = params;

  if (typeof userId !== "string") {
    return redirect("/home");
  }

  const recipient = await getUserById(userId);
  return json({ recipient });
};

export default function KudoModal() {
  const data = useLoaderData();
  const { firstName, lastName } = data.recipient.profile;

  return (
    <h2>
      {" "}
      User: {firstName} {lastName}{" "}
    </h2>
  );
}
