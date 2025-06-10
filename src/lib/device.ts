"use client";

import { Agent, DeviceUUID } from "device-uuid";

export function getDeviceUUID(): string | undefined {
  if (typeof window === undefined) return;
  return new DeviceUUID()?.get();
}

export function getDeviceAgentInfo(): Agent | undefined {
  if (typeof window === undefined) return;
  return new DeviceUUID()?.parse();
}
