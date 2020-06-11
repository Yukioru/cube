const before = ({ helmet }) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${helmet.meta.toString()}
    ${helmet.title.toString()}
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap" rel="stylesheet"> 
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
    <link rel="stylesheet" href="/assets/main.css">
    ${helmet.link.toString()}
  </head>
  <body ${helmet.bodyAttributes.toString()}>
    <div id="__app">
`.trim();

const after = () => `
    </div>

    <script src="/assets/bundle.js"></script>
  </body>
  </html>
`.trim();

export {
  before,
  after,
};
