const canvas = document.getElementById("art");
const ctx = canvas.getContext("2d");

function draw() {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const dpr = window.devicePixelRatio || 1;

  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // Background
  ctx.fillStyle = "#fbf5ed";
  ctx.fillRect(0, 0, w, h);

  // Draw geometric shapes
  function polygon(points, color) {
    ctx.beginPath();
    ctx.moveTo(points[0][0] * w, points[0][1] * h);
    points.slice(1).forEach(([x, y]) => {
      ctx.lineTo(x * w, y * h);
    });
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  polygon([[0,0.2],[0.35,0],[0.7,1],[0.4,1]], "#e9c5d0");
  polygon([[0.15,0],[0.45,0],[0.8,1],[0.55,1]], "#c9c2e8");
  polygon([[0.62,0],[1,0],[1,0.8],[0.85,0.65]], "#b9d9d4");
  polygon([[0,0.8],[0.3,0.45],[0.5,1],[0,1]], "#edc7aa");

  // Fine diagonal lines
  ctx.strokeStyle = "rgba(255,255,255,0.7)";
  ctx.lineWidth = 1;

  for (let i = -h; i < w + h; i += 22) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + h * 0.7, h);
    ctx.stroke();
  }

  // Concentric circles
  function rings(x, y, radius, count, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.4;

    for (let i = 0; i < count; i++) {
      ctx.beginPath();
      ctx.arc(x, y, radius * (1 - i / count), 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  rings(w*0.5, h*0.48, Math.min(w,h)*0.3, 18,
    "rgba(255,255,255,0.9)");

  rings(w*0.78, h*0.32, Math.min(w,h)*0.13, 10,
    "rgba(115,95,140,0.6)");

  // Golden focal point
  const x = w * 0.5;
  const y = h * 0.48;
  const r = Math.min(w, h) * 0.105;

  const gradient = ctx.createRadialGradient(
    x-r*0.3, y-r*0.3, 1, x, y, r
  );

  gradient.addColorStop(0, "#fff4ce");
  gradient.addColorStop(0.65, "#efd09b");
  gradient.addColorStop(1, "#d7a873");

  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.strokeStyle = "#fffaf0";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Floating decorative circles
  [
    [0.18,0.24,7,"#fff5e6"],
    [0.27,0.76,9,"#d8b4cb"],
    [0.82,0.72,8,"#fff5e6"],
    [0.88,0.17,11,"#e9c994"],
    [0.66,0.82,6,"#b9d9d4"]
  ].forEach(([px,py,radius,color]) => {
    ctx.beginPath();
    ctx.arc(w*px, h*py, radius, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
  });

  // Elegant border
  ctx.strokeStyle = "rgba(120,90,115,0.5)";
  ctx.lineWidth = 1;
  ctx.strokeRect(12, 12, w-24, h-24);
}

draw();
window.addEventListener("resize", draw);