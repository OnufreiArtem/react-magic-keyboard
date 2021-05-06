import { nanoid } from "nanoid";

import { PRESETS_STORAGE, SELECTED_PRESET, SELECTED_GROUP } from "./constants"

export function preset(title, color) {
    return {
        id: nanoid(),
        title,
        color,
        groups: [],
    };
}

export function group(title, color) {
    return {
        id: nanoid(),
        title,
        color,
        keys: [],
    };
}

export function setPresetsStorage(list) {
    window.localStorage.setItem(
        PRESETS_STORAGE,
        JSON.stringify([...list])
    );
}

export function getPresetsFromStore() {
    return [...JSON.parse(window.localStorage.getItem(PRESETS_STORAGE)) || []]
}

export const addKey = (key, groupId, presetId) => {
    let listCopy = [...getPresetsFromStore()];

    listCopy = listCopy.map(prs => {
        if(prs.id === presetId) {
            prs.groups = prs.groups.map(grp => {
                if(grp.id === groupId) {
                    grp.keys = [...new Set([...grp.keys, key])];
                } else {
                    grp.keys = grp.keys.filter(k => k !== key);
                }
                return grp;
            })
        }
        return prs;
    })
    
    setPresetsStorage(listCopy);
}

export const removeKey = (key, groupId, presetId) => {

    let listCopy = [...getPresetsFromStore()];

    listCopy = listCopy.map(prs => {
        if(prs.id === presetId) {
            prs.groups = prs.groups.map(grp => {
                if(grp.id === groupId) {
                    grp.keys = grp.keys.filter(k => k !== key);
                }
                return grp;
            })
        }
        return prs;
    })

    setPresetsStorage(listCopy);
}

export const isBtnSelected = (value, presetId, groupId) => {
    if(presetId === undefined) return false;
    if(groupId === undefined) return getPresetsFromStore().find(prs => prs.id === presetId)?.groups.reduce((acc, curr) => [...acc, ...curr.keys], []).includes(value)
    return getPresetsFromStore().find(prs => prs.id === presetId)?.groups.find(grp => grp.id === groupId)?.keys.includes(value) || false;
}

export const peakColor = (value, presetId, groupId) => {
    if(presetId) {
        if(groupId) {
            return getPresetsFromStore().find(prs => prs.id === presetId).groups.find(grp => grp.id === groupId)?.color || "#fff"           
        }
        return getPresetsFromStore().find(prs => prs.id === presetId).groups.find(grp => grp.keys.includes(value))?.color || '#fff'
    }

    return '#fff';
}


