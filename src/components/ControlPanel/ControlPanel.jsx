import React, { useState, useEffect } from "react";

import styled from "styled-components";
import OptionControlList from "./OptionControlList";

import * as service from "../utils";
import * as constants from "../constants";

const ControlPanelContainer = styled.div`
    padding: 20px;
`;

export default function ControlPanel(props) {
    const [presets, setPresets] = useState([]);
    const [selectedPreset, setSelectedPreset] = useState(undefined);
    const [selectedGroup, setSelectedGroup] = useState(undefined);

    const addPreset = (value) => {
        window.localStorage.setItem(
            constants.PRESETS_STORAGE,
            JSON.stringify([...presets, service.preset(value, '#fff')])
        );
        updateList();
    };

    const removePreset = (id) => {
        window.localStorage.setItem(
            constants.PRESETS_STORAGE,
            JSON.stringify([...presets.filter((prs) => prs.id !== id)])
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
        let listCopy = [...presets];
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

        let listCopy = [...presets];
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
        let listCopy = [...presets];
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
        let listCopy = [...presets];
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
        console.log("Updated preset list")
    }

    const updateSelPreset = () => {
        const prs = JSON.parse(
            window.localStorage.getItem(constants.SELECTED_PRESET)
        );
        setSelectedPreset(prs === "none" ? undefined : prs);
        console.log("Updated selected preset")
    }
    const updateSelGroup = () => {
        const grp = JSON.parse(
            window.localStorage.getItem(constants.SELECTED_GROUP)
        );
       
        setSelectedGroup(grp === "none" ? undefined : grp);
        console.log("Updated selected group")
    }

    const findPreset = (id) => {
        return presets.find(prs => prs.id === id);
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
