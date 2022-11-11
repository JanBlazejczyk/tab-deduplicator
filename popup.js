const tabsList = document.querySelector('.tabs-list');

const closeDuplicates = (tabUrl) => {
    chrome.tabs.query({}).then((tabs) => {
        const sameAddressTabsIds = tabs.filter(tab => tab.url === tabUrl).map(tab => tab.id);
        // lave the one that is active if there is one if not return everything except one
        const tabsToClose = sameAddressTabsIds.slice(1); 
        chrome.tabs.remove(tabsToClose);
    })
};

chrome.storage.local.get('duplicatedTabs', ({ duplicatedTabs }) => {
    // create an iterable and list all the tabs currently opened in the browser
    duplicatedTabs.forEach((tab) => {
        console.log(tab);
        const listItem = document.createElement('li');
        listItem.classList.add('tabs-list__item');
        listItem.innerHTML = `<span>${tab.title}</span><button id=${tab.id}>x</button>`
        tabsList.appendChild(listItem);
        const button = document.getElementById(`${tab.id}`);
        // better to close the tab that is opened before
        button.addEventListener('click', () => closeDuplicates(tab.url));
    });
});
