import { json } from "@remix-run/node";
import { useLoaderData, Outlet } from "@remix-run/react";

import { UserPanel } from "~/components/userPanel";
import { Layout } from "~/components/layout";
import { requireUserId } from "~/utils/auth.server";
import { getOtherUsers } from "~/utils/user.server";

import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const users = await getOtherUsers(userId);
  return json({ users });
};

export default function Home() {
  const { users } = useLoaderData();

  return (
    <Layout>
      <Outlet />
      <div className="h-full flex">
        <UserPanel users={users} />
      </div>
    </Layout>
  );
}
