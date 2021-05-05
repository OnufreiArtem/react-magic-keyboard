import { nanoid } from "nanoid";

import { PRESETS_STORAGE, SELECTED_PRESET, SELECTED_GROUP } from "./constants"

/*  Logic for presets and groups */
let presetList = JSON.parse(window.localStorage.getItem(PRESETS_STORAGE));

if (presetList === undefined || presetList === null) {
    presetList = [];
}

export function getPresetListRef() {
    return presetList;
}

export function getPresetList() {
    return [...presetList];
}

export function getPresetGroups(presetId) {
    return presetList.find(item => item.id === presetId)?.groups;
}

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

export function addPreset(preset) {
    presetList =
        presetList.filter((prs) => prs.id === preset.id).length === 0
            ? [...presetList, preset]
            : [...presetList];
}

export function findPreset(id) {
    return getPresetList().find(prs => prs.id === id);
}

export function addGroup(group, presetId) {
    presetList = presetList.map((preset) => {
        if (
            preset.id === presetId &&
            !preset.groups.find(grp => grp.id === group.id)
        ) {
            preset.groups.push(group);
        }
        return preset;
    });
}

export function findGroup(id, presetId) {
    return getPresetList().find(prs => prs.id === presetId)?.groups.find(grp => grp.id === id);
}


export function removePreset(presetId) {
    presetList = presetList.filter((prs) => prs.id !== presetId);
}

export function removeGroup(groupId, presetId) {
    presetList = presetList.map(prs => {
        if(prs.id === presetId){
            prs.groups = prs.groups.filter(grp => grp.id !== groupId);
        }
        return prs;
    })
}

export function updatePreset(preset) {
    if(presetList.filter(prs => prs.id === preset.Id).length !== 0) {
        removePreset(preset.id);
        addPreset(preset);
    }
}

export function updateGroup(group, presetId) {
   presetList = presetList.map(prs => {
       if(prs.id === presetId && prs.groups.filter(grp => grp.id === group.id) !== 0) {
           prs.groups = [...prs.groups.filter(grp => grp.id !== group.id), group]
       }
       return prs;
   })
}

export function updateStorage() {
    window.localStorage.setItem(PRESETS_STORAGE, JSON.stringify(presetList));
}

/* Logic for selected preset */

export let selectedPreset = getSPFromStorage();

if(!findPreset(selectedPreset?.id)) selectedPreset = undefined;

export function getSelectedPreset() {
    return selectedPreset ? Object.assign(selectedPreset) : undefined;
} 

export function updateSelectedPreset(nSelected) {
    window.localStorage.setItem(SELECTED_PRESET, JSON.stringify(nSelected ? nSelected : 'none'));
}

export function getSPFromStorage(){
    const sp = JSON.parse(window.localStorage.getItem(SELECTED_PRESET));
    return sp === 'none' ? undefined : sp;
}

/* Logic for selected group */

let selectedGroup = JSON.parse(window.localStorage.getItem(SELECTED_GROUP));
selectedGroup = selectedGroup === 'none' ? undefined : selectedGroup;

if(!findGroup(selectedGroup?.id)) selectedGroup = undefined;

export function getSelectedGroup() {
    return selectedGroup ? Object.assign(selectedGroup) : undefined;
} 

export function updateSelectedGroup(nSelected) {
    window.localStorage.setItem(SELECTED_GROUP, JSON.stringify(nSelected ? nSelected : 'none'));
}

export function getSGFromStorage(){
    const sg = JSON.parse(window.localStorage.getItem(SELECTED_GROUP));
    return sg === 'none' ? undefined : sg;
}

/* Logic for selected color */

export let selectedPresetColor = selectedPreset?.color || '#fff';

export function setSelectedPresetColor(color) {
    selectedPresetColor = color;
}