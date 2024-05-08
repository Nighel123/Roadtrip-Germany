const MongooseTsgen = require("mongoose-tsgen");
(async function () {
  const tsgen = new MongooseTsgen([]);
  const result = await tsgen.generateDefinitions({
    flags: {
      "dry-run": false,
      "no-format": false,
      "no-mongoose": false,
      "no-populate-overload": false,
      debug: false,
      output: "../common", //the path is not right we start here in server so ./= server directory!
      project: "./",
    },
    args: { model_path: "./src/models" },
  });
  await result.sourceFile.save();
})();
