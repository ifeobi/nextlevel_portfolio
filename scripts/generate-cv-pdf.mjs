import puppeteer from "puppeteer";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(__dirname, "../public/ife-cv.html");
const pdfPath  = resolve(__dirname, "../public/ife-cv.pdf");

const browser = await puppeteer.launch({ headless: true });
const page    = await browser.newPage();

await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0" });

await page.pdf({
  path: pdfPath,
  format: "A4",
  printBackground: true,
  margin: { top: "15mm", bottom: "15mm", left: "18mm", right: "18mm" },
});

await browser.close();
console.log("✓ CV PDF generated →", pdfPath);
