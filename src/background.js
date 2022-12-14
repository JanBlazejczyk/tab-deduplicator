const setTabs = (duplicatedTabs) => {
  chrome.storage.local.set({ duplicatedTabs });
};

const getDuplicatedUrls = (tabsUrls) => {
  const uniqueUrls = new Set(tabsUrls);

  const duplicatedUrls = tabsUrls.filter(item => {
    if (uniqueUrls.has(item)) {
      uniqueUrls.delete(item);
    } else {
      return item;
    }
  });

  return duplicatedUrls;
};

const getDuplicateTabs = (tabs) => {
  const tabsUrls = tabs.map((tab) => tab.url);
  const duplicatedUrls = getDuplicatedUrls(tabsUrls);
  const duplicatedTabs = [];

  for (let tab of tabs) {
    let alreadyIncludedUrls = duplicatedTabs.map(tab => tab.url);

    if (duplicatedUrls.includes(tab.url) && !alreadyIncludedUrls.includes(tab.url)) {
      duplicatedTabs.push(tab);
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
  });
};

// event listeners
chrome.runtime.onInstalled.addListener(updateTabData);
chrome.tabs.onUpdated.addListener(updateTabData);
chrome.tabs.onRemoved.addListener(updateTabData);
