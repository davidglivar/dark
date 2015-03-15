var dfs = require("../../lib/dark/fs");
var expect = require("chai").expect;
var fs = require("graceful-fs");
var File = require("../../lib/dark/fs/file");
var join = require("path").join;

describe("dark-fs", function () {

  it("exposes .readFile()", function () {
    expect(dfs).to.have.property("readFile");
  });

  it("exposes .readFileSync()", function () {
    expect(dfs).to.have.property("readFileSync");
  });

  it("does not expose File()", function () {
    expect(dfs).not.to.have.property("File");
  });

  it("does not expose ReadStream()", function () {
    expect(dfs).not.to.have.property("ReadStream");
  });

  describe(".readFile()", function () {

    it("is a function with an arity of 3", function () {
      expect(dfs.readFile).to.be.a("function");
      expect(dfs.readFile.length).to.eql(3);
    });

    it('passes error and null arguments to the callback when file does not exist', function (done) {
      dfs.readFile(join(__dirname, '../__fixtures__/not-real.js'), function (err, file) {
        expect(err).to.be.ok.and.to.be.instanceof(Error);
        expect(file).to.be.null;
        done();
      });
    });

    it('passes error and null arguments to the callback when file is not readable', function (done) {
      dfs.readFile(__dirname, function (err, file) {
        expect(err).to.be.ok.and.to.be.instanceof(Error);
        expect(file).to.be.null;
        done();
      });
    });

    it('passes a null error and a File instance to the callback', function (done) {
      dfs.readFile(join(__dirname, "../__fixtures__/lorem.js"), function (err, file) {
        expect(err).to.be.null;
        expect(file).to.be.instanceof(File);
        expect(file.contents).to.be.ok;
        done();
      });
    });
  });

  describe(".readFileSync()", function () {

    it("is a function with an arity of 2", function () {
      expect(dfs.readFileSync).to.be.a("function");
      expect(dfs.readFileSync.length).to.eql(2);
    });

    it("returns an object with File and fs.Stats instances", function () {
      var result = dfs.readFileSync(join(__dirname, "../__fixtures__/lorem.js"));
      expect(result.file).to.be.instanceof(File);
      expect(result.stats).to.be.instanceof(fs.Stats);
    });

    it("throws an error when file does not exist", function () {
      var err;
      try {
        var result = dfs.readFileSync(join(__dirname, "../__fixtures__/not-real.js"));
      } catch (e) {
        err = e;
      }
      expect(err).to.be.instanceof(Error);
    });

    it("throws an error when given an unreadable file", function () {
      var err;
      try {
        var result = dfs.readFileSync(__dirname);
      } catch (e) {
        err = e;
      }
      expect(err).to.be.instanceof(Error);
    });
  });
});
