// SPDX-License-Identifier: AGPL-3.0-or-later
// Fills the apps' downloads from apps.json – the feed the release workflow of kernoid/apps writes, which the site's
// publishing takes from the newest published release (pages.yml): each system's card gets its download and SHA-256.
// No feed yet: the cards say the build is pending.
(async () => {
  let feed;
  try {
    const res = await fetch('apps.json', { cache: 'no-cache' });
    if (!res.ok) return;
    feed = await res.json();
  } catch { return; }
  if (!feed || !feed.version || !Array.isArray(feed.files) || !feed.files.length) return;

  // What a button says where a card offers more than one download.
  const labels = { 'linux-x64': 'x64', 'linux-arm64': 'arm64' };

  const bar = document.querySelector('[data-release]');
  bar.querySelector('[data-version]').textContent = feed.version;
  if (feed.page) bar.querySelector('[data-page]').href = feed.page;

  for (const get of document.querySelectorAll('[data-get]')) {
    const platforms = get.dataset.get.split(' ');
    const files = platforms.map(p => feed.files.find(f => f.platform === p)).filter(Boolean);
    if (!files.length) continue;
    get.replaceChildren();
    for (const file of files) {
      const item = document.createElement('div');
      const link = document.createElement('a');
      link.className = 'button primary';
      link.href = file.url;
      link.textContent = files.length > 1 ? `download · ${labels[file.platform] ?? file.platform}` : 'download';
      const sum = document.createElement('code');
      sum.className = 'sum';
      sum.title = 'SHA-256 of ' + file.name;
      sum.textContent = 'sha256 ' + file.sha256;
      item.append(link, sum);
      get.append(item);
    }
  }

  const mac = feed.files.find(f => f.platform === 'macos');
  if (mac) {
    document.querySelector('[data-install="macos"]').textContent =
      `curl -fLO ${mac.url}\ncurl -fLO ${mac.url}.sha256\nshasum -a 256 -c ${mac.name}.sha256\nditto -x -k ${mac.name} /Applications`;
  }
})();
