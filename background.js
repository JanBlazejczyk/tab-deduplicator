let tabs = ['dummy tab'];

const setTabs = () => {
    chrome.tabs.query({}).then((tabs) => {
        chrome.storage.local.set({ tabs });
        console.log('New tabs saved in storage');
        console.log(tabs);
    })
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ tabs });
    console.log('Dummy tabs are set!');
});

chrome.tabs.onCreated.addListener(setTabs);
chrome.tabs.onRemoved.addListener(setTabs);
