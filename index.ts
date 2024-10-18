
Bun.serve({
  fetch(req) {
    return new Response("<h1>Welcome to My Framework!</h1>", {
      headers: { 'Content-Type': 'text/html' },
    });
  },
  port: 3000,
});

console.log("vuelo running: http://localhost:3000/");

