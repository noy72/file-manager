import { contextBridge, ipcRenderer } from "electron";
import { CHANNELS } from "../constant";
import { ItemForRenderer, LocalItem, Tags } from "../types";

contextBridge.exposeInMainWorld("api", {
    getItems: (query: string): Promise<ItemForRenderer[]> =>
        ipcRenderer.invoke(CHANNELS.GET_ITEMS, query),
    getItem: (id: string): Promise<ItemForRenderer> =>
        ipcRenderer.invoke(CHANNELS.GET_ITEM, id),
    getLocalItems: (id: string): Promise<LocalItem[]> =>
        ipcRenderer.invoke(CHANNELS.GET_LOCAL_ITEMS, id),
    getTags: (): Promise<Tags> => ipcRenderer.invoke(CHANNELS.GET_TAGS),
    updateOpenedAtById: (id: string): Promise<void> => ipcRenderer.invoke(CHANNELS.UPDATE_OPENED_AT, id),
    addItemTag: (id: string, group: string, tag: string): Promise<Tags> =>
        ipcRenderer.invoke(CHANNELS.ADD_TEIM_TAG, id, group, tag),
    open: (location: string): Promise<void> =>
        ipcRenderer.invoke(CHANNELS.OPEN, location),
    popupItemCardMenu: (location: string): Promise<void> =>
        ipcRenderer.invoke(CHANNELS.POPUP_ITEM_CARD_MENU, location),
});
