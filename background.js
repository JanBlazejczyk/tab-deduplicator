let tabs = ['dummy tab'];

// disable the extension on default
chrome.action.disable();

const setTabs = () => {
    chrome.tabs.query({}).then((tabs) => {
        chrome.storage.local.set({ tabs });
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

const toggleIcon = () => {
  chrome.storage.local.get('tabs', ({ tabs }) => {
    const tabsUrls = tabs.map((tab) => tab.url);
    const tabsHaveDuplicates = findDuplicates(tabsUrls).length > 0;

    tabsHaveDuplicates ? chrome.action.enable() : chrome.action.disable();
  })
};

// event listeners
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ tabs });
});

chrome.tabs.onCreated.addListener(() => {
  setTabs();
  checkDuplicates();
});

chrome.tabs.onRemoved.addListener(() => {
  setTabs();
  toggleIcon();
});

chrome.tabs.onUpdated.addListener(() => {
  setTabs();
  toggleIcon();
});
