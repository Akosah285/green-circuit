export interface SystemStatus {
  status: string;
  message: string;
  accessLevel: string;
  environment: string;
  timestamp: string;
}

export class StatusAccessError extends Error {}

function isSystemStatus(value: unknown): value is SystemStatus {
  return (
    typeof value === "object" &&
    value !== null &&
    "status" in value && typeof value.status === "string" &&
    "message" in value && typeof value.message === "string" &&
    "accessLevel" in value && typeof value.accessLevel === "string" &&
    "environment" in value && typeof value.environment === "string" &&
    "timestamp" in value && typeof value.timestamp === "string"
  );
}

export async function requestStatus(signal: AbortSignal): Promise<SystemStatus> {
  const response = await fetch("/api/status", {
    signal: AbortSignal.any([signal, AbortSignal.timeout(15_000)]),
    cache: "no-store",
  });

  if (response.status === 401 || response.status === 403 || response.redirected) {
    throw new StatusAccessError("GitHub sign-in is required to access this response.");
  }
  if (!response.ok) {
    throw new Error(`Status request failed with HTTP ${response.status}.`);
  }

  const value: unknown = await response.json();
  if (!isSystemStatus(value)) {
    throw new Error("The status response has an unexpected format.");
  }
  return value;
}
