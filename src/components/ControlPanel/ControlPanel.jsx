import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import styled from "styled-components";
import OptionControlList from "./OptionControlList";

import * as service from "../utils";

const ControlPanelContainer = styled.div`
    padding: 20px;

`;

function ControlPanel({
    onPresetsChanged,
    onSelectedPresetChanged,
    onSelectedGroupChanged
}) {
    const [presets, setPresets] = useState([]);
    const [selectedPreset, setSelectedPreset] = useState(undefined);
    const [selectedGroup, setSelectedGroup] = useState(undefined);

    const addPreset = (value) => {
        service.setPresetsStorage([...service.getPresetsFromStore(), service.preset(value, '#fff')])
        updateList();
    };

    const removePreset = (id) => {
        service.setPresetsStorage(service.getPresetsFromStore().filter((prs) => prs.id !== id))
        updateList();

        if(id === selectedPreset) {
            service.clearSelectedPreset();
            updateSelPreset();
        }
    };

    const onPresetColorChanged = (color, preset, e) => {
        let listCopy = [...service.getPresetsFromStore()];
        listCopy = listCopy.map(prs => {
            if(prs.id === preset.id) return {...prs, color: color};
            return prs;
        })
        service.setPresetsStorage(listCopy);
        updateList();
    };

    const onGroupColorChanged = (color, group, presetId, e) => {
        if(!presetId) return;

        let listCopy = [...service.getPresetsFromStore()];
        
        listCopy = listCopy.map(prs => {
            if(prs.id === presetId) {
                prs.groups = prs.groups.map(grp => {
                    if(grp.id === group.id) return {...grp, color: color};
                    return grp;
                })

            }
            return prs
        })
        service.setPresetsStorage(listCopy);
        updateList();
    };

    const addGroup = (value, presetId) => {
        let listCopy = [...service.getPresetsFromStore()];
        listCopy = listCopy.map(prs => {
            if(prs.id === presetId) {
                prs.groups.push(service.group(value, '#fff'))
            }
            return prs
        })
        service.setPresetsStorage(listCopy);
        updateList();
    }

    const removeGroup = (id, presetId) => {
        let listCopy = [...service.getPresetsFromStore()];
        listCopy = listCopy.map(prs => {
            if(prs.id === presetId) {
                prs.groups = [...prs.groups.filter(grp => grp.id !== id)]
            }
            return prs
        })
        service.setPresetsStorage(listCopy);
        updateList();

        if(id === selectedGroup && presetId === selectedPreset) {
            service.clearSelectedGroup()
            updateSelGroup();
        }
    }

    useEffect(() => {
        updateList();
        updateSelPreset();
        updateSelGroup();
    }, []) 

    const updateList = () => {
        const list = service.getPresetsFromStore();
        setPresets(list);
        onPresetsChanged(list);
        console.log("Updated preset list");
    }

    const updateSelPreset = () => {
        const prs = service.getSelectedPreset();
        setSelectedPreset(prs);
        onSelectedPresetChanged(prs);
        console.log("Updated selected preset");
    }

    const updateSelGroup = () => {
        const grp = service.getSelectedGroup();
        setSelectedGroup(grp);
        onSelectedGroupChanged(grp);
        console.log("Updated selected group");
    }

    return (
        <ControlPanelContainer>
            <OptionControlList
                placeholder={"Your preset name here"}
                list={presets}
                selectedId={selectedPreset}
                onAdd={(value) => addPreset(value)}
                onRemove={(id) => removePreset(id)}
                onSelectionChanged={(id) => {
                    service.setSelectedPreset(id);
                    updateSelPreset();
                    service.clearSelectedGroup();
                    updateSelGroup();
                }}
                onColorChanged={onPresetColorChanged}
            />
            {(selectedPreset !== undefined && presets.length !== 0) ? (
                <OptionControlList
                    placeholder={"Your group name here"}
                    list={presets.find(prs => prs.id === selectedPreset)?.groups || []}
                    areItemsToggle
                    selectedId={selectedGroup}
                    onAdd={(value) => addGroup(value, selectedPreset)}
                    onRemove={(id) => removeGroup(id, selectedPreset)}
                    onSelectionChanged={(id) => {
                        service.setSelectedGroup(id, selectedPreset);
                        updateSelGroup();
                    }}
                    onColorChanged={(color, group, e) =>
                        onGroupColorChanged(color, group, selectedPreset, e)
                    }
                />
            ) : (
                <></>
            )}
        </ControlPanelContainer>
    );
}

ControlPanel.propTypes = {
    onPresetsChanged: PropTypes.func,
    onSelectedPresetChanged: PropTypes.func,
    onSelectedGroupChanged: PropTypes.func,
}


export default ControlPanel;