export const SCROLL_RESTORE_SELECTOR = "[data-ui-scroll-storage-key]";
export const SCROLL_RESTORE_STORAGE_KEY_ATTR = "data-ui-scroll-storage-key";
export const SCROLL_RESTORE_AXIS_ATTR = "data-ui-scroll-axis";
export const SCROLL_RESTORE_FLAG = "__uiLabScrollRestored";

export function getScrollPositionProperty(
  direction: "vertical" | "horizontal",
): "scrollTop" | "scrollLeft" {
  return direction === "horizontal" ? "scrollLeft" : "scrollTop";
}

export function generateScrollRestoreScript(): string {
  return `(function(){try{if(typeof window==="undefined"||typeof document==="undefined")return;if(window.__uiLabScrollRestoreBootstrap)return;window.__uiLabScrollRestoreBootstrap=true;var selector=${JSON.stringify(SCROLL_RESTORE_SELECTOR)};var storageKeyAttr=${JSON.stringify(SCROLL_RESTORE_STORAGE_KEY_ATTR)};var axisAttr=${JSON.stringify(SCROLL_RESTORE_AXIS_ATTR)};var restoreFlag=${JSON.stringify(SCROLL_RESTORE_FLAG)};function readStoredOffset(storageKey){try{var storedValue=window.sessionStorage.getItem(storageKey);if(storedValue===null)return null;var parsedValue=parseInt(storedValue,10);return Number.isNaN(parsedValue)?null:parsedValue}catch(_error){return null}}function restoreNode(node){if(!node||node.nodeType!==1||node[restoreFlag])return;var storageKey=node.getAttribute(storageKeyAttr);if(!storageKey)return;var axis=node.getAttribute(axisAttr)==="horizontal"?"scrollLeft":"scrollTop";var storedOffset=readStoredOffset(storageKey);if(storedOffset===null)return;node[axis]=storedOffset;node[restoreFlag]=true}function restoreTree(root){if(!root)return;if(root.nodeType===1&&root.matches&&root.matches(selector))restoreNode(root);if(!root.querySelectorAll)return;var nodes=root.querySelectorAll(selector);for(var index=0;index<nodes.length;index+=1){restoreNode(nodes[index])}}restoreTree(document);if(document.readyState!=="loading"||typeof MutationObserver==="undefined"||!document.documentElement)return;var observer=new MutationObserver(function(records){for(var recordIndex=0;recordIndex<records.length;recordIndex+=1){var record=records[recordIndex];for(var nodeIndex=0;nodeIndex<record.addedNodes.length;nodeIndex+=1){restoreTree(record.addedNodes[nodeIndex])}}});observer.observe(document.documentElement,{childList:true,subtree:true});function stopObserving(){observer.disconnect();document.removeEventListener("DOMContentLoaded",stopObserving);window.removeEventListener("load",stopObserving)}document.addEventListener("DOMContentLoaded",stopObserving,{once:true});window.addEventListener("load",stopObserving,{once:true})}catch(_error){}})();`;
}
