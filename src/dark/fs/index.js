import File from "./file";
import fs from "graceful-fs";
import ReadStream from "./read-stream";

export function readFile(filename, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = {};
  }
  fs.stat(filename, (err, stats) => {
    if (err) return callback(err, null);
    fs.readFile(filename, options, (err, buf) => {
      if (err) return callback(err, null);
      try {
        var file = new File(filename, buf);
      } catch (e) { return callback(e, null); }
      callback(null, file, stats);
    });
  });
};

export function readFileSync(filename, options) {
  options = options || {};
  let stats = fs.statSync(filename);
  let buf = fs.readFileSync(filename, options);
  return { file: new File(filename, buf), stats };
};
