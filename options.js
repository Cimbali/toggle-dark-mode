function update() {
	const accumulator = (acc, checkbox) => Object.assign(acc, {[checkbox.name]: checkbox.checked})
	const include = Array.from(document.getElementsByTagName('input')).reduce(accumulator, {})

	if (Object.values(include).reduce((acc, val) => acc + val) >= 2) {
		browser.storage.local.set({ include });
		browser.runtime.sendMessage({ include });
		document.getElementById('more-values-needed').style.display = 'none';
	} else {
		document.getElementById('more-values-needed').style.display = 'block';
	}
}

browser.storage.local.get({ include: {} }).then(({ include }) => {
	Array.from(document.getElementsByTagName('input')).forEach(checkbox => {
		checkbox.checked = include[checkbox.name];
		checkbox.onclick = update;
	});
});
