import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/fullscreen")({
  beforeLoad: () => {
    throw redirect({
      to: "/visualizer",
    });
  },
});