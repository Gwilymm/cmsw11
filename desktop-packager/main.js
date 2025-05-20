const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

const FRONTEND_PORT = 3000;
const BACKEND_PORT = 1337;

// En prod, on lit dans app.asar.unpacked ; en dev, __dirname
function getUnpackedBase() {
	return app.isPackaged
		? path.join(process.resourcesPath, 'app.asar.unpacked')
		: __dirname;
}

let backendProcess, frontendProcess;

// Crée la fenêtre Electron en pointant sur SSR
function createWindow() {
	const win = new BrowserWindow({
		width: 1200, height: 800,
		webPreferences: { contextIsolation: true }
	});
	win.webContents.openDevTools({ mode: 'detach' });
	win.loadURL(`http://localhost:${FRONTEND_PORT}`);
}

// Démarre Strapi via le JS compilé
function startBackend(base) {
	const entry = path.join(base, 'build-backend', 'index.js');
	if (!fs.existsSync(entry)) {
		console.error('❌ Strapi dist introuvable à :', entry);
		return;
	}
	backendProcess = spawn('node', [ entry, '--port', `${BACKEND_PORT}` ], {
		cwd: path.dirname(entry),
		stdio: [ 'ignore', 'pipe', 'pipe' ]
	});
	backendProcess.stdout.on('data', data => console.log(`[Strapi] ${data}`));
	backendProcess.stderr.on('data', data => console.error(`[Strapi ERR] ${data}`));
}

// Démarre Astro SSR via l’entry .mjs dans dist-frontend
function startFrontend(base) {
	const entry = path.join(base, 'dist-frontend', 'server', 'entry.mjs');
	if (!fs.existsSync(entry)) {
		console.error('❌ Astro SSR introuvable à :', entry);
		return;
	}
	frontendProcess = spawn('node', [ entry, '--port', `${FRONTEND_PORT}` ], {
		cwd: path.dirname(entry),
		stdio: [ 'ignore', 'pipe', 'pipe' ]
	});
	frontendProcess.stdout.on('data', data => console.log(`[Astro] ${data}`));
	frontendProcess.stderr.on('data', data => console.error(`[Astro ERR] ${data}`));
}

app.whenReady().then(() => {
	const base = getUnpackedBase();
	startBackend(base);
	startFrontend(base);
	createWindow();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
app.on('will-quit', () => {
	backendProcess?.kill();
	frontendProcess?.kill();
});
process.on('unhandledRejection', err => console.error('UnhandledRejection', err));
