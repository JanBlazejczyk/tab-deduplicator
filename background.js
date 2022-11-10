let tabs = [];

const setTabs = () => {
    chrome.tabs.query({}).then((tabs) => {
      chrome.storage.local.set({ tabs });
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
chrome.runtime.onInstalled.addListener(setTabs);
chrome.tabs.onCreated.addListener(setTabs);
chrome.tabs.onRemoved.addListener(setTabs);
chrome.tabs.onUpdated.addListener(setTabs);
