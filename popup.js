const tabsList = document.querySelector('.tabs-list');

// TODO: here get only duplicated tabs
chrome.storage.local.get('tabs', ({ tabs }) => {
    // only include the tabs that are duplicated
    const mappedTabs = tabs.map((tab) => {
        return {
            title: tab.title,
            url: tab.url
        }
    });

    // create an iterable and list all the tabs currently opened in the browser
    mappedTabs.forEach((mappedTab) => {
        const listItem = document.createElement('li');
        listItem.classList.add('tabs-list__item');
        listItem.innerHTML = `<span>${mappedTab.title}</span>`
        tabsList.appendChild(listItem);
    })
});

