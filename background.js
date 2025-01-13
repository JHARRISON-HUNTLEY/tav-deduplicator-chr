function getRootUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.origin;
  } catch (e) {
    console.error('Error parsing URL:', url, e);
    return url;
  }
}

async function handleNewTab(tab) {
  // Skip if the tab doesn't have a URL yet or it's chrome:// or edge:// etc
  if (!tab.url || tab.url.startsWith('chrome') || tab.url.startsWith('edge')) {
    return;
  }

  console.log('Handling tab:', tab.url);
  const newTabRootUrl = getRootUrl(tab.url);
  console.log('Root URL:', newTabRootUrl);

  // Get all tabs in the current window
  const tabs = await chrome.tabs.query({ windowId: tab.windowId });
  
  // Find existing tab with matching root URL
  const existingTab = tabs.find(otherTab => {
    // Skip the new tab itself and empty tabs
    if (otherTab.id === tab.id || !otherTab.url) return false;
    
    // Compare root URLs
    const otherRootUrl = getRootUrl(otherTab.url);
    console.log('Comparing with:', otherRootUrl);
    return otherRootUrl === newTabRootUrl;
  });

  if (existingTab) {
    console.log('Found existing tab:', existingTab.url);
    // Activate the existing tab
    await chrome.tabs.update(existingTab.id, { active: true });
    // Remove the new tab
    await chrome.tabs.remove(tab.id);
  }
}

// Listen for tab creation
chrome.tabs.onCreated.addListener(async (tab) => {
  if (tab.pendingUrl) {
    handleNewTab({ ...tab, url: tab.pendingUrl });
  }
});

// Listen for tab updates (catches links that open in new tabs)
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    handleNewTab(tab);
  }
});