browser.storage.local.get('include').then(({ include }) => {
	Array.from(document.getElementsByTagName('input')).forEach(checkbox => {
		checkbox.checked = include[checkbox.name];
		checkbox.onclick = event => {
			include[checkbox.name] = checkbox.checked
			if (Object.values(include).reduce((v, a) => v + a, 0) >= 2) {
				browser.storage.local.set({ include });
				browser.runtime.sendMessage({ include });
				document.getElementById('more-values-needed').style.display = 'none';
			} else {
				document.getElementById('more-values-needed').style.display = 'block';
			}
		}
	});
});
