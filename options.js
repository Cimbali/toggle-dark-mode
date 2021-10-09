browser.storage.local.get({ include_system: false }).then(({ include_system }) => {
	const checkbox = document.getElementById('include_system');
	checkbox.checked = include_system;

	checkbox.onclick = event => {
		browser.storage.local.set({ include_system: checkbox.checked });
		browser.runtime.sendMessage({ include_system: checkbox.checked });
	}
});
