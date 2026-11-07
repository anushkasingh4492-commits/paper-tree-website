import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

/**
 * /dashboard (no slug): signed-in users are bounced to their own institute's
 * dashboard so they never land on a generic page.
 */
export default async function DashboardRoot() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const user = (session as { user?: Record<string, unknown> } | null)?.user;
  const slug = (user?.instituteSlug as string) || "";

  if (!slug) {
    redirect("/login");
  }

  redirect(`/dashboard/${slug}`);
}
