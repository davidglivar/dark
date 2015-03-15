import { makeAccessor } from "private";
import ReadStream from "./read-stream";

const p = makeAccessor();

export default class File {

  constructor(realpath, buffer) {
    this.buffer = buffer || null;
    this.realpath = realpath || null;
  }

  get buffer() { return p(this).buffer; }
  set buffer(v) {
    if (!(v instanceof Buffer) && v !== null) {
      throw new TypeError(`Expected instanceof Buffer, got ${typeof v}`);
    }
    p(this).buffer = v;
  }

  get contents() {
    if (this.buffer === null) return null;
    return this.buffer.toString();
  }

  get source() {
    if (this.buffer === null) return null;
    return new ReadStream(this.buffer.slice(0));
  }

  get realpath() { return p(this).realpath; }
  set realpath(v) {
    if (typeof v !== "string" && v !== null) {
      throw new TypeError(`Expected type of string, got ${typeof v}`);
    }
    p(this).realpath = v;
  }
}
