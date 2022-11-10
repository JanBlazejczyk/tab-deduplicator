const tabsList = document.querySelector('.tabs-list');

chrome.storage.local.get('tabs', ({ tabs }) => {
    
    const mappedTabs = tabs.map((tab) => {
        return {
            title: tab.title,
            url: tab.url
        }
    });

    console.log('mappedTabs', mappedTabs);

    // create an iterable and list all the tabs currently opened in the browser
    mappedTabs.forEach((mappedTab) => {
        const listItem = document.createElement('li');
        listItem.classList.add('tabs-list__item');
        listItem.innerHTML = `<span>${mappedTab.title}</span>`
        tabsList.appendChild(listItem);
    })
});

