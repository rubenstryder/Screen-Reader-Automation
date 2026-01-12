const fs = require('fs');
const path = require('path');
const { virtual } = require("@guidepup/virtual-screen-reader");

test("should navigate to the input and announce the placeholder", async () => {
  
  const html = fs.readFileSync(path.join(__dirname, '../pages/search-input.html'), 'utf8');
  document.body.innerHTML = html;

  // Start the Virtual Screen Reader.
  await virtual.start({ container: document.body });

  // Move to the label element.
  await virtual.next();

  // Move to the input element.
  await virtual.next();

  // Expect on the spoken phrase for the input element.
  expect(await virtual.lastSpokenPhrase()).toEqual(
    "textbox, Search for topics, placeholder Search..."
  );

  // Stop the Virtual Screen Reader.
  await virtual.stop();
});