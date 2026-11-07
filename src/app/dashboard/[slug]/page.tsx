import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

/**
 * /dashboard/[slug]: an institute's private assessment dashboard.
 *
 * SECURITY BOUNDARY (answers your cross-institute question):
 *   The signed session carries the user's instituteSlug. We render the
 *   dashboard ONLY when user.instituteSlug === slug. A Vigyaan Academy login
 *   cannot reach /dashboard/infinity, and an Infinity Classes login cannot
 *   reach /dashboard/vigyaan — they are bounced back to their own dashboard.
 */
export default async function InstituteDashboard({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const user = (session as { user?: Record<string, unknown> } | null)?.user;
  const userSlug = (user?.instituteSlug as string) || "";

  if (userSlug !== slug) {
    // Cross-institute access attempt — refuse and bounce to their own dashboard.
    redirect(`/dashboard/${userSlug || "login"}`);
  }

  return (
    <main className="dashboard">
      <h1>
        {(user?.instituteName as string) || "Institute"} Dashboard
      </h1>
      <p className="intro">
        Welcome back, <strong>{(user?.name as string) || "User"}</strong>.
      </p>
      <p>
        You are logged in as a{" "}
        <strong>{(user?.role as string) || "member"}</strong> of{" "}
        <strong>{(user?.instituteName as string) || "your institute"}</strong>.
      </p>
      <div className="dashboard-note">
        <strong>Access control:</strong> This dashboard is scoped to your
        institute only. A login from another institute cannot reach your data,
        and your login cannot reach another institute&rsquo;s dashboard.
      </div>
    </main>
  );
}
