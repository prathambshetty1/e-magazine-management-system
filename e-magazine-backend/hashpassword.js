const bcrypt = require("bcryptjs");

async function generateHash() {
  const password = "admin123"; // Change if you want
  const hash = await bcrypt.hash(password, 10);

  console.log("\nPassword:", password);
  console.log("\nHash:\n");
  console.log(hash);
}

generateHash();