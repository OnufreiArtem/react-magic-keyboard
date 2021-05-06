import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import styled from "styled-components";
import OptionControlList from "./OptionControlList";

import * as service from "../utils";
import * as constants from "../constants";

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
        window.localStorage.setItem(
            constants.PRESETS_STORAGE,
            JSON.stringify([...getListFromStore(), service.preset(value, '#fff')])
        );
        updateList();
    };

    const removePreset = (id) => {
        window.localStorage.setItem(
            constants.PRESETS_STORAGE,
            JSON.stringify([...getListFromStore().filter((prs) => prs.id !== id)])
        );
        updateList();

        if(id === selectedPreset) {
            window.localStorage.setItem(
                constants.SELECTED_PRESET,
                JSON.stringify("none")
            );

            updateSelPreset();
        }
    };

    const onPresetColorChanged = (color, preset, e) => {
        //console.log(color);
        let listCopy = [...getListFromStore()];
        listCopy = listCopy.map(prs => {
            if(prs.id === preset.id) return {...prs, color: color};
            return prs;
        })
        //console.log(listCopy)
        window.localStorage.setItem(
            constants.PRESETS_STORAGE,
            JSON.stringify([...listCopy])
        );
        updateList();
    };

    const onGroupColorChanged = (color, group, presetId, e) => {
        if(!presetId) return;

        console.log(color)

        let listCopy = [...getListFromStore()];
        console.log(listCopy)
        listCopy = listCopy.map(prs => {
            if(prs.id === presetId) {
                prs.groups = prs.groups.map(grp => {
                    if(grp.id === group.id) return {...grp, color: color};
                    return grp;
                })

            }
            return prs
        })
        console.log(listCopy)

        window.localStorage.setItem(
            constants.PRESETS_STORAGE,
            JSON.stringify([...listCopy])
        );
        updateList();
    };

    const addGroup = (value, presetId) => {
        let listCopy = [...getListFromStore()];
        listCopy = listCopy.map(prs => {
            if(prs.id === presetId) {
                prs.groups.push(service.group(value, '#fff'))
            }
            return prs
        })

        window.localStorage.setItem(
            constants.PRESETS_STORAGE,
            JSON.stringify([...listCopy])
        );
        updateList();

        
    }

    const removeGroup = (id, presetId) => {
        let listCopy = [...getListFromStore()];
        listCopy = listCopy.map(prs => {
            if(prs.id === presetId) {
                prs.groups = [...prs.groups.filter(grp => grp.id !== id)]
            }
            return prs
        })
        window.localStorage.setItem(
            constants.PRESETS_STORAGE,
            JSON.stringify([...listCopy])
        );
        updateList();

        if(id === selectedGroup && presetId === selectedPreset) {
            window.localStorage.setItem(
                constants.SELECTED_GROUP,
                JSON.stringify("none")
            );
           
            updateSelGroup();
        }
    }

    const getListFromStore = () => {
        return [...JSON.parse(window.localStorage.getItem(constants.PRESETS_STORAGE)) || []]
    }

    useEffect(() => {
        updateList();
        updateSelPreset();
        updateSelGroup();
    }, []) 

    const updateList = () => {
        const list = JSON.parse(
            window.localStorage.getItem(constants.PRESETS_STORAGE)
        );
        setPresets(list || []);
        onPresetsChanged(list || []);
        console.log("Updated preset list")
    }

    const updateSelPreset = () => {
        const prs = JSON.parse(
            window.localStorage.getItem(constants.SELECTED_PRESET)
        );
        setSelectedPreset(prs === "none" ? undefined : prs);
        onSelectedPresetChanged(prs === "none" ? undefined : prs)
        console.log("Updated selected preset")
    }

    const updateSelGroup = () => {
        const grp = JSON.parse(
            window.localStorage.getItem(constants.SELECTED_GROUP)
        );
       
        setSelectedGroup(grp === "none" ? undefined : grp);
        onSelectedGroupChanged(grp === "none" ? undefined : grp)
        console.log("Updated selected group")
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

                    window.localStorage.setItem(
                        constants.SELECTED_PRESET,
                        JSON.stringify(id)
                    );
                   
                    updateSelPreset();

                    window.localStorage.setItem(
                        constants.SELECTED_GROUP,
                        JSON.stringify("none")
                    );
                   
                    updateSelGroup();
                    
                }}
                onColorChanged={(color, preset, e) =>
                    onPresetColorChanged(color, preset, e)
                }
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
                        window.localStorage.setItem(
                            constants.SELECTED_GROUP,
                            JSON.stringify(id || "none")
                        );
                       
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