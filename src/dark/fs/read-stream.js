import { makeAccessor } from "private";
import { Readable } from "readable-stream";

const p = makeAccessor();

export default class ReadStream extends Readable {

  constructor(contents) {
    super();
    p(this).contents = contents;
  }

  _read(size) {
    this.push(p(this).contents);
    p(this).contents = null;
  }
}
