import { contextBridge, ipcRenderer } from "electron";
import { CHANNELS } from "../constant";
import { ItemForRenderer, LocalItem } from "../types";

contextBridge.exposeInMainWorld("api", {
    getItems: (query: string): Promise<ItemForRenderer[]> => ipcRenderer.invoke(CHANNELS.GET_ITEMS, query),
    getItem: (id: string): Promise<ItemForRenderer> => ipcRenderer.invoke(CHANNELS.GET_ITEM, id),
    getLocalItems: (id: string): Promise<LocalItem[]> => ipcRenderer.invoke(CHANNELS.GET_LOCAL_ITEMS, id),
    open: (location: string): Promise<void> => ipcRenderer.invoke(CHANNELS.OPEN, location),
});
