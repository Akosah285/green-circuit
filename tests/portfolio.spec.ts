import { expect, test } from "@playwright/test";

const status = {
  status: "online",
  message: "Test system",
  accessLevel: "standard",
  environment: "test",
  timestamp: "2026-11-21T03:00:00.000Z",
};

test("portfolio preserves its readable charcoal theme in both system modes", async ({ page }) => {
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme });
    await page.goto("/");
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(10, 10, 10)");
    await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("color", "rgb(255, 255, 255)");
  }
});

test("portfolio uses its loaded display, reading and code fonts", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("body")).toHaveCSS("font-family", /inter/i);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("font-family", /space[ _]grotesk/i);
  await expect(page.locator("header a").first()).toHaveCSS("font-family", /jetbrains[ _]mono/i);
});

test("home hydrates without animation mismatch under reduced motion", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const hero = page.locator("section").filter({ has: page.getByRole("heading", { level: 1 }) });
  await expect(hero).toHaveCSS("transform", "none");
  await page.getByRole("link", { name: "Explore Builds", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Builds", exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test("compact homepage keeps highlight labels separate and footer links touchable", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/");
  const heading = page.getByRole("heading", { name: "Selected Highlights" });
  const caption = page.getByText("One build, one school project");
  const headingBounds = await heading.boundingBox();
  const captionBounds = await caption.boundingBox();
  expect(headingBounds).not.toBeNull();
  expect(captionBounds).not.toBeNull();
  expect(captionBounds!.y).toBeGreaterThanOrEqual(headingBounds!.y + headingBounds!.height);
  for (const link of await page.locator("footer a").all()) {
    const bounds = await link.boundingBox();
    expect(bounds!.height).toBeGreaterThanOrEqual(44);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("home highlights open separate build and schoolwork destinations", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Green Circuit \(Personal Cloud Platform\)/ }).click();
  await expect(page).toHaveURL(/\/builds#green-circuit$/);
  await expect(page.getByRole("heading", { name: "Builds", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Autonomous Maze Solving Bot" })).toHaveCount(0);
  await page.goto("/");
  await page.getByRole("link", { name: /Autonomous Maze Solving Bot/ }).click();
  await expect(page).toHaveURL(/\/schoolwork#autonomous-maze-solving-bot$/);
  await expect(page.getByRole("heading", { name: "Schoolwork", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Green Circuit (Personal Cloud Platform)" })).toHaveCount(0);
});

test("legacy work bookmarks still expose both project categories", async ({ page }) => {
  await page.goto("/work#autonomous-maze-solving-bot");
  await expect(page.locator("#autonomous-maze-solving-bot")).toBeVisible();
  await expect(page.locator("#green-circuit")).toBeAttached();
});

test("navigation explains private access and fits narrow screens", async ({ page, isMobile }) => {
  await page.goto("/");
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  if (isMobile) {
    await navigation.getByRole("button", { name: "Menu", exact: true }).click();
    await expect(navigation.getByRole("button", { name: "Menu", exact: true })).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(navigation.getByRole("button", { name: "Menu", exact: true })).toHaveAttribute("aria-expanded", "false");
    await navigation.getByRole("button", { name: "Menu", exact: true }).click();
  }
  await navigation.getByRole("link", { name: "Private Lab", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Private Lab", exact: true })).toBeVisible();
  await expect(page.getByText(/GitHub sign-in/).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Enter Private Lab" })).toHaveAttribute("href", "/lab");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("coursework announces expansion and collapses its content", async ({ page }) => {
  await page.goto("/academics");
  const disclosure = page.getByRole("button", { name: /Systems, Control & Hardware/ });
  await expect(disclosure).toHaveAttribute("aria-expanded", "true");
  const panelId = await disclosure.getAttribute("aria-controls");
  expect(panelId).toBeTruthy();
  await expect(page.locator(`[id="${panelId}"]`)).toBeVisible();
  await page.keyboard.press("Tab");
  await disclosure.focus();
  await expect(disclosure).toHaveCSS("outline-style", "solid");
  await expect(disclosure).toHaveCSS("outline-offset", "-4px");
  await disclosure.click();
  await expect(disclosure).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator(`[id="${panelId}"]`)).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("Lab reports failures, retries, and retains explicitly stale data", async ({ page }) => {
  let available = false;
  await page.route("**/api/status", async (route) => {
    await route.fulfill(
      available
        ? { status: 200, json: status }
        : { status: 503, json: { error: "Unavailable" } }
    );
  });
  await page.goto("/lab");
  await expect(page.locator("main [role='alert']")).toContainText("Status unavailable");
  await expect(page.getByText("Querying /api/status...")).toBeHidden();
  available = true;
  await page.getByRole("button", { name: "Retry" }).click();
  await expect(page.locator("pre")).toContainText("Test system");
  available = false;
  await page.getByRole("button", { name: "Ping API" }).click();
  await expect(page.locator("main [role='alert']")).toContainText("Status unavailable");
  await expect(page.getByText("Last successful response")).toBeVisible();
  await expect(page.locator("pre")).toContainText("Test system");
});

test("Lab distinguishes denied access and malformed successful responses", async ({ page }) => {
  await page.route("**/api/status", (route) => route.fulfill({ status: 403, json: {} }));
  await page.goto("/lab");
  await expect(page.locator("main [role='alert']")).toContainText("Access denied");
  await expect(page.getByRole("link", { name: "Sign in with GitHub" })).toHaveAttribute("href", "/.auth/login/github?post_login_redirect_uri=/lab");
  await page.unroute("**/api/status");
  await page.route("**/api/status", (route) => route.fulfill({ status: 200, json: { status: "online" } }));
  await page.getByRole("button", { name: "Retry" }).click();
  await expect(page.locator("main [role='alert']")).toContainText("Status unavailable");
  await expect(page.locator("pre")).toHaveCount(0);
});
