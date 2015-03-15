var expect = require("chai").expect;
var File = require("../../lib/dark/fs/file");
var ReadStream = require("../../lib/dark/fs/read-stream");

describe("File()", function () {

  it("is exposed as a function with an arity of 2", function () {
    expect(File).to.be.a("function");
    expect(File.length).to.eql(2);
  });

  describe(".buffer", function () {
    var df = null;
    afterEach(function () { df = null; });

    it("is public", function () {
      df = new File();
      expect(df).to.have.property("buffer");
    });

    it("is null when constructed with no arguments", function () {
      df = new File();
      expect(df.buffer).to.be.null;
    });

    it("throws an error when set to anything other than a Buffer (or null)", function () {
      var a = function () {
        df = new File("realpath", "buffer", {});
      };
      var b = function () {
        df = new File();
        df.buffer = "string";
      };
      var c = function () {
        df = new File();
        df.buffer = [1, 2, 3];
      };
      var d = function () {
        df = new File();
        df.buffer = new Buffer("code");
      };
      var e = function () {
        df = new File();
        df.buffer = null;
      };
      expect(a).to.throw(TypeError);
      expect(b).to.throw(TypeError);
      expect(c).to.throw(TypeError);
      expect(d).not.to.throw();
      expect(e).not.to.throw();
    });
  });

  describe(".contents", function () {
    var df = null;
    afterEach(function () { df = null; });

    it("is public", function () {
      df = new File();
      expect(df).to.have.property("contents");
    });

    it("returns the contents of buffer as a string", function () {
      df = new File("fake", new Buffer("code"));
      expect(df.contents).to.eql(df.buffer.toString());
    });

    it("cannot be set to a value", function () {
      df = new File("fake", new Buffer("code"));
      df.contents = "not code";
      expect(df.contents).to.eql(df.buffer.toString()).and.to.eql("code");
    });
  });

  describe(".source", function () {
    var df = null;
    afterEach(function () { df = null; });

    it("is public", function () {
      df = new File();
      expect(df).to.have.property("source");
    });

    it("returns null when buffer is null", function () {
      df = new File();
      expect(df.source).to.be.null;
    });

    it("returns an instance of dark's ReadStream when buffer is a Buffer", function () {
      df = new File(null, new Buffer("code"));
      expect(df.source).to.be.instanceof(ReadStream);
    });
  });

  describe(".realpath", function () {
    var df = null;
    afterEach(function () { df = null; });

    it("is public", function () {
      df = new File();
      expect(df).to.have.property("realpath");
    });

    it("is null when constructed with no arguments", function () {
      df = new File();
      expect(df.realpath).to.be.null;
    });

    it("throws an error when set to anything other than a string (or null)", function () {
      var a = function () {
        df = new File([]);
      };
      var b = function () {
        df = new File();
        df.realpath = true;
      };
      var c = function () {
        df = new File();
        df.realpath = "string";
      };
      var d = function() {
        df = new File();
        df.realpath = null;
      };
      expect(a).to.throw(TypeError);
      expect(b).to.throw(TypeError);
      expect(c).not.to.throw();
      expect(d).not.to.throw();
    });
  });
});
