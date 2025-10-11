import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const git = simpleGit();
const path = "./data.json";

// Utility: delay helper to avoid GitHub push rate limits
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function markCommit(x, y) {
  const date = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = { date };
  await jsonfile.writeFile(path, data);

  try {
    await git.add([path]);
    await git.commit(date, { "--date": date });
    await git.push("origin", "main");
    console.log(`✅ Commit created and pushed for ${date}`);
    await sleep(100); // small delay to avoid race conditions
  } catch (err) {
    console.error("❌ Commit failed:", err);
  }
}

async function drawJOMM() {
  const coords = [
    // J
    [14,1],[15,1],[16,1],
    [16,2],[16,3],[16,4],
    [14,5],[16,5],
    [15,6],[16,6],

    // O
    [19,1],[20,1],[21,1],
    [19,2],[21,2],
    [19,3],[21,3],
    [19,4],[21,4],
    [19,5],[21,5],
    [19,6],[20,6],[21,6],

    // M
    [24,1],[24,2],[24,3],[24,4],[24,5],[24,6],
    [25,2],[26,3],
    [27,2],
    [28,1],[28,2],[28,3],[28,4],[28,5],[28,6],

    // Second M
    [30,1],[30,2],[30,3],[30,4],[30,5],[30,6],
    [31,2],[32,3],
    [33,2],
    [34,1],[34,2],[34,3],[34,4],[34,5],[34,6],

    // :)
  // :)
  [36,2], // left eye
  [36,4], // right eye
  [38,5],[39,4],[40,3],[39,2],[38,1] // smile curve

  ];

  for (const [x, y] of coords) {
    await markCommit(x, y);
  }

  console.log("🎉 All commits complete!");
}


drawJOMM();
