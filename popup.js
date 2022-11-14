const tabsList = document.querySelector('.tabs-list');

const closeDuplicates = ({ url }) => {
  chrome.tabs.query({}).then((tabs) => {
    const tabsWithUrl = tabs.filter(tab => tab.url === url);
    const activeTab = tabsWithUrl.find(tab => tab.active);
    const tabsToClose = activeTab ? tabsWithUrl.filter(tab => !tab.active).map(tab => tab.id) : tabsWithUrl.slice(1).map(tab => tab.id);
    chrome.tabs.remove(tabsToClose).then(() => location.reload());  
  });
};

chrome.storage.local.get('duplicatedTabs', ({ duplicatedTabs }) => {
  if (duplicatedTabs.length === 0) {
    window.close();
  }

  duplicatedTabs.forEach((tab) => {
    const listItem = document.createElement('li');
    listItem.classList.add('tabs-list__item');
    listItem.setAttribute('id', tab.id);
    listItem.innerHTML = `<img class="tab-icon" src=${tab.favIconUrl}><span>${tab.title}</span>`;
    tabsList.appendChild(listItem);
    listItem.addEventListener('click', () => closeDuplicates(tab));
  });
});
