let tabs = [];

const setTabs = (duplicatedTabs) => {
  chrome.storage.local.set({ duplicatedTabs });
}

const getDuplicateTabs = (tabs) => {
  const tabsUrls = tabs.map((tab) => tab.url);
  const duplicatedUrls = findDuplicates(tabsUrls);
  const duplicatedTabs = [];
  
  // return each tab with duplicate just once
  for (let tab of tabs) {
    if (duplicatedUrls.includes(tab.url)) {
      duplicatedTabs.push(tab);
      break;
    }
  }

  return duplicatedTabs;
};

const toggleIcon = (tabs) => {
  const tabsHaveDuplicates = getDuplicateTabs(tabs).length > 0;
  tabsHaveDuplicates ? chrome.action.enable() : chrome.action.disable();
};

const updateTabData = () => {
    chrome.tabs.query({}).then((tabs) => {
      const duplicatedTabs = getDuplicateTabs(tabs);
      setTabs(duplicatedTabs);
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

// event listeners
chrome.runtime.onInstalled.addListener(updateTabData);
chrome.tabs.onUpdated.addListener(updateTabData);
chrome.tabs.onRemoved.addListener(updateTabData);
