// @ts-check
import { module } from "@prisma/composer";
import traceyKqService from "./service.mjs";

export default module("determined-rose-wolf", ({ provision }) => {
  provision(traceyKqService, { id: "traceykq" });
});
