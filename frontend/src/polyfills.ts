/* eslint-disable @typescript-eslint/no-explicit-any */
import { Buffer } from "buffer";
// import * as process from "process";

(window as any).global = window;
(window as any).global.Buffer = Buffer;
// (window as any).global.Buffer = Buffer.Buffer;

// (window as any).process = process;
(window as any).process = { env: {} };
