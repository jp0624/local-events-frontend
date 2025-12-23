# Post-Restart Setup for Local Events Project

This document outlines the step-by-step procedure to bring your **WSL**, **Drupal**, **DDEV**, and **Next.js / VS Code** environment back up after a computer restart or shutdown.

---

## 1. Start WSL

Open **PowerShell** or **Windows Terminal**:

```powershell
wsl --list --verbose
```

- Verify your distributions (e.g., `Ubuntu`) are installed.
- Note the default user and version.

Start your Ubuntu distribution:

```powershell
wsl -d Ubuntu
```

This opens your Ubuntu shell.

---

## 2. Navigate to Your Project Directory

Inside WSL:

```bash
cd ~/projects/local-events/apps/backend-drupal
```

> Make sure you are in the correct user home (`~/projects`), not `/mnt/c/...`.

---

## 3. Start DDEV

Check DDEV version and start your project:

```bash
ddev version
ddev start
```

- `ddev start` should bring up your containers.
- You should see output confirming the project URI (e.g., `https://local-events.ddev.site`).

---

## 4. Verify Drupal Status

Run:

```bash
ddev drush -r web status
```

Expected output:

- Drupal version
- Site URI
- Database connection status: `Connected`
- PHP version
- Drupal root

> If you see database errors, ensure DDEV containers are running (`ddev list`).

---

## 5. Verify Files and Configuration

Check your Drupal files:

```bash
ddev exec "ls -la /var/www/html/web/sites/default"
ddev drush -r web cex -y
```

- Make sure `settings.php` and `settings.ddev.php` exist.
- Confirm configuration sync directory is correct (`../config/sync`).

---

## 6. Open Frontend (Next.js)

Open **VS Code** on Windows:

1. Use the **WSL Remote** extension.
2. Open the folder:

```text
/home/jp0624/projects/local-events/apps/frontend-next
```

> This will open the Next.js project in WSL context for proper Node/npm environment.

Start the Next.js frontend:

```bash
npm install       # if not installed
npm run dev
```

- Check browser at `http://localhost:3000`.

---

## 7. Optional: Verify JSON:API

For headless CMS endpoints:

```bash
curl -s "http://local-events.ddev.site/jsonapi/node/event" | head -c 400
```

- Should return JSON of your events.
- Repeat for `/organizer` or `/venue` endpoints if implemented.

---

## 8. Troubleshooting Tips

- **No console response**: Make sure you are inside WSL shell, not Windows PowerShell.
- **DDEV container fails**: `ddev restart` or `ddev logs` for details.
- **Next.js stale error**: Stop the server and run `npm run dev` again inside WSL.

---

## 9. Quick Summary Commands

```bash
# Open WSL
wsl -d Ubuntu

# Navigate to backend
cd ~/projects/local-events/apps/backend-drupal

# Start DDEV
ddev start

# Check Drupal
ddev drush -r web status

# Open frontend (in WSL)
cd ~/projects/local-events/apps/frontend-next
npm install
npm run dev
```

---

End of procedure.

