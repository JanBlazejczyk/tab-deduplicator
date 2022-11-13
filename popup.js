const tabsList = document.querySelector('.tabs-list');

const closeDuplicates = ({ url, id }) => {
    chrome.tabs.query({ url }).then((tabs) => {
        const activeTab = tabs.find(tab => tab.active);
        const tabsToClose = activeTab ? tabs.filter(tab => !tab.active).map(tab => tab.id) : tabs.slice(1).map(tab => tab.id); 
        chrome.tabs.remove(tabsToClose);
        location.reload();
    })
};

chrome.storage.local.get('duplicatedTabs', ({ duplicatedTabs }) => {
    if (duplicatedTabs.length === 0) {
        window.close();
    }

    duplicatedTabs.forEach((tab) => {
        const listItem = document.createElement('li');
        listItem.classList.add('tabs-list__item');
        listItem.setAttribute('id', tab.id)
        listItem.innerHTML = `<img class="tab-icon" src=${tab.favIconUrl}><span>${tab.title}</span>`;
        tabsList.appendChild(listItem);
        const tabItem = document.getElementById(`${tab.id}`);
        tabItem.addEventListener('click', () => closeDuplicates(tab));
    });
});
