import { nanoid } from "nanoid";

const PRESETS_STORAGE = "PrEsEt_StOrAgE";

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
       if(prs.id === presetId && prs.groups.filter(grp => grp.id === group) !== 0) {
           prs.groups = [...prs.groups.filter(grp => grp.id !== group.id), group]
       }
       return prs;
   })
}

export function updateStorage() {
    window.localStorage.setItem(PRESETS_STORAGE, JSON.stringify(presetList));
}