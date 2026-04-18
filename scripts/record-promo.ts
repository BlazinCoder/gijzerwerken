import { chromium, type Page } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

// --- Helpers ---

async function smoothScroll(page: Page, pixels: number, duration: number) {
  await page.evaluate(
    async ({ px, ms }) => {
      const steps = 60;
      const stepPx = px / steps;
      const stepMs = ms / steps;
      for (let i = 0; i < steps; i++) {
        window.scrollBy(0, stepPx);
        await new Promise((r) => setTimeout(r, stepMs));
      }
    },
    { px: pixels, ms: duration }
  );
}

async function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function scrollToBottom(page: Page, duration: number) {
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight - window.innerHeight);
  if (scrollHeight > 0) {
    await smoothScroll(page, scrollHeight, duration);
  }
}

// --- Main ---

(async () => {
  try {
    // Check of dev server draait
    try {
      await fetch('http://localhost:3000');
      console.log('Dev server bereikbaar op localhost:3000');
    } catch {
      console.error('ERROR: Dev server draait niet op localhost:3000. Start eerst npm run dev in een andere terminal.');
      process.exit(1);
    }

    console.log('Starting promo recording...');

    const browser = await chromium.launch({
      headless: false,
      slowMo: 100,
      args: ['--hide-scrollbars'],
    });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: './promo/',
      size: { width: 1920, height: 1080 },
    },
    // Hide cursor by injecting CSS
    bypassCSP: true,
  });

  const page = await context.newPage();

  // Hide cursor globally
  await page.addInitScript(() => {
    const style = document.createElement('style');
    style.textContent = '* { cursor: none !important; }';
    document.head.appendChild(style);
  });

  // Also inject after each navigation
  async function hideCursor() {
    await page.evaluate(() => {
      if (!document.getElementById('hide-cursor-style')) {
        const style = document.createElement('style');
        style.id = 'hide-cursor-style';
        style.textContent = '* { cursor: none !important; }';
        document.head.appendChild(style);
      }
    });
  }

  // ========================================
  // A. HOMEPAGE (8 seconden)
  // ========================================
  console.log('A. Homepage...');
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await hideCursor();
  await wait(2000); // Wacht op vonken particles

  // Hover over het GG logo in de hero (trigger burst)
  const heroLogo = page.locator('section img[alt="Gijzerwerken"]').first();
  if (await heroLogo.isVisible()) {
    await heroLogo.hover();
    await wait(3000); // Burst effect afspeelt
  } else {
    console.log('  Hero logo not found, skipping hover');
    await wait(3000);
  }

  // Smooth scroll naar "Uitgelicht werk"
  const uitgelichtHeading = page.locator('h2:has-text("Uitgelicht werk")');
  if (await uitgelichtHeading.isVisible()) {
    await uitgelichtHeading.scrollIntoViewIfNeeded();
  } else {
    await smoothScroll(page, 800, 2000);
  }
  await wait(2000);

  // ========================================
  // B. PORTFOLIO (10 seconden)
  // ========================================
  console.log('B. Portfolio...');
  await page.goto(`${BASE_URL}/portfolio`, { waitUntil: 'networkidle' });
  await hideCursor();
  await wait(1500);

  // Slow scroll door de grid
  await smoothScroll(page, 600, 3000);

  // Hover over portfolio cards
  const cards = page.locator('.group').filter({ has: page.locator('img') });
  const cardCount = await cards.count();
  for (let i = 0; i < Math.min(3, cardCount); i++) {
    const card = cards.nth(i);
    if (await card.isVisible()) {
      await card.hover();
      await wait(500);
    }
  }

  // Klik op eerste card → lightbox
  if (cardCount > 0) {
    await cards.first().click();
    await wait(2000);

    // Navigeer naar volgende foto
    const nextBtn = page.locator('button[aria-label="Volgende"]');
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await wait(1000);
    }

    // Sluit lightbox
    await page.keyboard.press('Escape');
    await wait(500);
  }

  // ========================================
  // C. OVER GIJS (6 seconden)
  // ========================================
  console.log('C. Over Gijs...');
  await page.goto(`${BASE_URL}/over`, { waitUntil: 'networkidle' });
  await hideCursor();
  await wait(1000);

  // Smooth scroll door de hele pagina (verhaal, werkplaats, feiten)
  await scrollToBottom(page, 4000);

  // Counters zijn nu in beeld geweest en hebben opgeteld
  await wait(2000);

  // ========================================
  // D. HET PROCES (8 seconden)
  // ========================================
  console.log('D. Het Proces...');
  await page.goto(`${BASE_URL}/proces`, { waitUntil: 'networkidle' });
  await hideCursor();
  await wait(1000);

  // Langzaam scrollen zodat de copper tijdlijn-lijn meegroeit
  await scrollToBottom(page, 6000);
  await wait(1000);

  // ========================================
  // E. SHOP (6 seconden)
  // ========================================
  console.log('E. Shop...');
  await page.goto(`${BASE_URL}/shop`, { waitUntil: 'networkidle' });
  await hideCursor();
  await wait(1000);

  // Scroll door product grid
  await smoothScroll(page, 500, 2000);

  // Hover over een product card
  const shopCards = page.locator('.group').filter({ has: page.locator('img') });
  if ((await shopCards.count()) > 0) {
    await shopCards.first().hover();
  }
  await wait(2000);

  // ========================================
  // F. CONTACT (4 seconden)
  // ========================================
  console.log('F. Contact...');
  await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });
  await hideCursor();
  await wait(1000);

  // Laat formulier + contactinfo zien
  await smoothScroll(page, 300, 1000);
  await wait(2000);

  // ========================================
  // G. TERUG NAAR HOME (3 seconden)
  // ========================================
  console.log('G. Terug naar home...');
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await hideCursor();
  await wait(1000);

  // Laatste shot van hero met vonken
  await wait(2000);

  // ========================================
  // Opslaan
  // ========================================
  console.log('Recording done, saving video...');
  await page.close(); // triggers video save
  await context.close();
  await browser.close();

  console.log('\nVideo saved to ./promo/');
  console.log('To convert to mp4, run:');
  console.log(
    '  ffmpeg -i promo/*.webm -c:v libx264 -preset slow -crf 18 promo/gijzerwerken-promo.mp4'
  );
  } catch (error) {
    console.error('Promo recording crashed:', error);
    process.exit(1);
  }
})();
