import { Suspense } from "react";
import { PersonalPortal } from "./PersonalPortal";

export default async function Home() {
  if (process.env.NODE_ENV !== "development") return <PersonalPortal />;

  const { HomepagePrototype } = await import("./HomepagePrototype");
  return (
    <Suspense fallback={<PersonalPortal />}>
      <HomepagePrototype />
    </Suspense>
  );
}
