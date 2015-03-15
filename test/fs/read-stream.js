var expect = require("chai").expect;
var ReadStream = require("../../lib/dark/fs/read-stream");
var Stream = require("readable-stream");

describe("ReadStream()", function () {

  it("is exposed as a function with an arity of 1", function () {
    expect(ReadStream).to.be.a("function");
    expect(ReadStream.length).to.eql(1);
  });

  it("extends Stream.Readable", function () {
    var rs = new ReadStream();
    expect(rs).to.be.instanceof(Stream.Readable);
    expect(rs).to.be.instanceof(ReadStream);
  });

  it("is able to pipe its contents", function (done) {
    var rs = new ReadStream(new Buffer("code"));
    var passthrough = new Stream.PassThrough();
    rs.pipe(passthrough)
      .on("data", function (chunk) {
        expect(chunk).to.eql(new Buffer("code"));
        expect(chunk.toString()).to.eql("code");
      })
      .on("finish", done);
  });
});
