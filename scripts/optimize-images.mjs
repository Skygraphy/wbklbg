import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const BASE = 'static/images';
const OUT  = 'static/images/webp';

async function ensureDir(dir) {
	if (!existsSync(dir)) await mkdir(dir, { recursive: true });
}

async function convert(src, outName, width, quality = 82) {
	const outPath = path.join(OUT, outName);
	await sharp(path.join(BASE, src))
		.resize({ width, withoutEnlargement: true })
		.webp({ quality })
		.toFile(outPath);
	const { size } = await import('fs').then(fs => fs.promises.stat(outPath));
	const { size: origSize } = await import('fs').then(fs => fs.promises.stat(path.join(BASE, src)));
	console.log(`  ${outName}: ${Math.round(origSize/1024)}KB → ${Math.round(size/1024)}KB (-${Math.round((1-size/origSize)*100)}%)`);
}

async function convertMakingOff(filename, index) {
	const base = `making_off/${filename}`;
	const n = String(index + 1).padStart(2, '0');
	await convert(base, `making_off/${n}-400.webp`, 400, 82);
	await convert(base, `making_off/${n}-800.webp`, 800, 82);
}

async function main() {
	await ensureDir(OUT);
	await ensureDir(path.join(OUT, 'making_off'));
	await ensureDir(path.join(OUT, 'thumbs'));

	// Hero (4000×2354) — multiple sizes for responsive srcset
	console.log('\nHero:');
	await convert('hero-klosterneuburg.jpg', 'hero-800.webp',  800,  85);
	await convert('hero-klosterneuburg.jpg', 'hero-1280.webp', 1280, 85);
	await convert('hero-klosterneuburg.jpg', 'hero-1920.webp', 1920, 85);
	await convert('hero-klosterneuburg.jpg', 'hero-2560.webp', 2560, 85);

	// Familienfoto (1280×960)
	console.log('\nFamilienfoto:');
	await convert('Familienfoto.jpg', 'familienfoto-640.webp',  640, 82);
	await convert('Familienfoto.jpg', 'familienfoto-1280.webp', 1280, 82);

	// Buchcover (663×856 and ~663×856)
	console.log('\nBuchcover:');
	await convert('Wimmelbuch_Deckblatt.jpg',  'deckblatt-320.webp',  320, 85);
	await convert('Wimmelbuch_Deckblatt.jpg',  'deckblatt-640.webp',  640, 85);
	await convert('Wimmelbuch_Rückseite.jpg', 'rueckseite-320.webp', 320, 85);
	await convert('Wimmelbuch_Rückseite.jpg', 'rueckseite-640.webp', 640, 85);

	// Making-off (927×927 each)
	console.log('\nMaking-off:');
	const makingOff = [
		'01_vor_ort.jpg',
		'02_die_erste_skizze_entsteht.JPG',
		'03_fotos_sortieren_und_ausdrucken.JPG',
		'04_zeichnen_mit_dem_lightpad.JPG',
		'05_geduldspiel_outlines.JPG',
		'06_farbe_bringt_leben.JPG',
		'07_raetseln_erlaubt.jpg',
		'08_probedruck_und_feinschliff.JPG',
		'09_ein_traum_wird_wahr.jpg',
	];
	for (let i = 0; i < makingOff.length; i++) {
		await convertMakingOff(makingOff[i], i);
	}

	// Thumbs (already ~15KB — still worth WebP for consistency)
	console.log('\nThumbs:');
	for (let i = 1; i <= 12; i++) {
		const n = String(i).padStart(2, '0');
		await convert(`thumbs/${n}.jpg`, `thumbs/${n}.webp`, 200, 80);
	}

	console.log('\nDone.');
}

main().catch(console.error);
