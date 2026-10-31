// SPDX-License-Identifier: AGPL-3.0-or-later
// Fills the apps' downloads from apps.json – the feed the release workflow of kernoid/apps writes, which the site's
// publishing takes from the newest published release (pages.yml). No feed yet: the "on their way" note stays.
(async () => {
  let feed;
  try {
    const res = await fetch('apps.json', { cache: 'no-cache' });
    if (!res.ok) return;
    feed = await res.json();
  } catch { return; }
  if (!feed || !feed.version || !Array.isArray(feed.files) || !feed.files.length) return;

  const names = {
    macos: 'macOS · Apple silicon and Intel',
    windows: 'Windows · x64',
    'linux-x64': 'Linux · x64',
    'linux-arm64': 'Linux · arm64',
    android: 'Android · arm64',
  };
  const box = document.querySelector('[data-release]');
  box.querySelector('[data-version]').textContent = feed.version;
  if (feed.page) box.querySelector('[data-page]').href = feed.page;
  else box.querySelector('[data-page]').hidden = true;

  const list = box.querySelector('[data-downloads]');
  for (const platform of Object.keys(names)) {
    const file = feed.files.find(f => f.platform === platform);
    if (!file) continue;
    const row = document.createElement('div');
    row.className = 'download';
    const link = document.createElement('a');
    link.className = 'button';
    link.href = file.url;
    link.textContent = names[platform];
    const sum = document.createElement('code');
    sum.className = 'sum';
    sum.title = 'SHA-256 of ' + file.name;
    sum.textContent = file.sha256;
    row.append(link, sum);
    list.append(row);
  }

  const mac = feed.files.find(f => f.platform === 'macos');
  if (mac) {
    document.querySelector('[data-install="macos"]').textContent =
      `curl -fLO ${mac.url}\ncurl -fLO ${mac.url}.sha256\nshasum -a 256 -c ${mac.name}.sha256\nditto -x -k ${mac.name} /Applications`;
  }
  document.querySelector('[data-pending]').hidden = true;
  box.hidden = false;
})();
