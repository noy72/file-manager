import { contextBridge, ipcRenderer } from "electron";
import { GET_ITEMS } from "../constant";
import { ItemForRenderer } from "../types";

contextBridge.exposeInMainWorld("api", {
    getItems: (): Promise<ItemForRenderer> => ipcRenderer.invoke(GET_ITEMS),
});
