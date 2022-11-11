const tabsList = document.querySelector('.tabs-list');

const closeDuplicates = (tabUrl) => {
    chrome.tabs.query({}).then((tabs) => {
        const sameAddressTabsIds = tabs.filter(tab => tab.url === tabUrl).map(tab => tab.id);
        const tabsToClose = sameAddressTabsIds.slice(1);
        chrome.tabs.remove(tabsToClose);
    })
};

chrome.storage.local.get('duplicatedTabs', ({ duplicatedTabs }) => {
    const mappedTabs = duplicatedTabs.map((tab) => {
        return {
            title: tab.title,
            url: tab.url
        }
    });

    // create an iterable and list all the tabs currently opened in the browser
    mappedTabs.forEach((mappedTab) => {
        /* 
            TODO:
            - create a button inside of each item
            - give each button the id of the url of the corresponding tab
            - add listener for the onclick on the button and invoke closeDuplicates with event.target.id
        */
        const listItem = document.createElement('li');
        listItem.classList.add('tabs-list__item');
        listItem.innerHTML = `<span>${mappedTab.title}</span>`
        tabsList.appendChild(listItem);
    });
});
