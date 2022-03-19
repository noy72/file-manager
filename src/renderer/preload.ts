import { contextBridge, ipcRenderer } from "electron";
import { GET_ITEMS, GET_ITEM } from "../constant";
import { ItemForRenderer } from "../types";

contextBridge.exposeInMainWorld("api", {
    getItems: (query: string): Promise<ItemForRenderer[]> => ipcRenderer.invoke(GET_ITEMS, query),
    getItem: (id: string): Promise<ItemForRenderer> => ipcRenderer.invoke(GET_ITEM, id),
});
