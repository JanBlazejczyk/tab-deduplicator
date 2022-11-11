let tabs = [];

const setTabs = (tabs) => {
  chrome.storage.local.set({ tabs });
}

const getDuplicateTabs = (tabs) => {
  const tabsUrls = tabs.map((tab) => tab.url);
  const duplicatedUrls = findDuplicates(tabsUrls);
  
  return tabs.filter(tab => duplicatedUrls.includes(tab.url));
}

const updateTabData = () => {
    chrome.tabs.query({}).then((tabs) => { // TODO: check if will work without the empty object
      const duplicatedTabs = getDuplicateTabs(tabs);
      setTabs(duplicatedTabs);
      setTabs(tabs); // TODO: is this needed?
      toggleIcon(tabs);
    })
};

const findDuplicates = (array) => {
  const uniqueUrls = new Set(array);

  const duplicatedUrls = array.filter(item => {
    if (uniqueUrls.has(item)) {
        uniqueUrls.delete(item);
    } else {
        return item;
    }
  });

  return duplicatedUrls;
};

const toggleIcon = (tabs) => {
  const tabsUrls = tabs.map((tab) => tab.url);
  const tabsHaveDuplicates = findDuplicates(tabsUrls).length > 0;
  tabsHaveDuplicates ? chrome.action.enable() : chrome.action.disable();
};

// event listeners
// TODO: check if onUpdated will be enough without created and removed
chrome.runtime.onInstalled.addListener(updateTabData);
chrome.tabs.onCreated.addListener(updateTabData);
chrome.tabs.onRemoved.addListener(updateTabData);
chrome.tabs.onUpdated.addListener(updateTabData);
