import React, { useState, useEffect } from "react";

import styled from "styled-components";
import OptionControlList from "./OptionControlList";

import * as service from "../utils";

const ControlPanelContainer = styled.div`
    padding: 20px;
`;

export default function ControlPanel(props) {
    const [presets, setPresets] = useState(service.getPresetList());
    const [selectedPreset, setSelectedPreset] = useState(service.getSelectedPreset());
    const [selectedGroup, setSelectedGroup] = useState(service.getSelectedGroup());
    const [groupPanelVisible, makeGroupVisible] = useState(false);

    const addPreset = (value) => {
        const nPreset = service.preset(value, `#fff`);
        service.addPreset(nPreset);
        service.updateStorage();
        setPresets(service.getPresetList());
        console.log(`adding ${value}`);
    };

    const removePreset = (id) => {
        console.log(`Selection removing: ${id === selectedPreset}`)
        if(id === selectedPreset) setSelectedPreset(undefined);
        console.log(`Selected preset: ${selectedPreset} `)
        service.removePreset(id);
        service.updateStorage();
        setPresets(service.getPresetList());
        console.log(`removing ${id}`);
    };

    const onPresetColorChanged = (color, preset, e) => {
        let presetCopy = Object.assign(preset);
        presetCopy.color = color;
        service.updatePreset(presetCopy);
        service.updateStorage();
    }

    const onGroupColorChanged = (color, group, e) => {
        let groupCopy = Object.assign(group);
        groupCopy.color = color;
        service.updatePreset(groupCopy);
        service.updateStorage();
    }

    const addGroup = (value, presetId) => {
        const nGroup = service.group(value, `#fff`);
        service.addGroup(nGroup, presetId);
        service.updateStorage();
        setPresets(service.getPresetList());
    }

    const removeGroup = (id, presetId) => {
        if(id === selectedGroup) setSelectedGroup(undefined);
        service.removeGroup(id, presetId)
        service.updateStorage();
        setPresets(service.getPresetList());
    }

    useEffect(() => {
        if(presets.length === 0) setSelectedPreset(undefined);     
        
    }, [presets])

    useEffect(() => {
        if(!selectedPreset) {
            setSelectedGroup(undefined);
            makeGroupVisible(false)
            console.log(`No preset selected`)
        }
        else {
            makeGroupVisible(true);
            console.log(`Selected: ${selectedPreset}`)
        } 
        service.updateSelectedPreset(service.findPreset(selectedPreset));
        setSelectedGroup(undefined);
        
    }, [selectedPreset])

    useEffect(() => {
        service.updateSelectedGroup(service.findGroup(selectedGroup, selectedPreset));
    }, [selectedGroup])

    return (
        <ControlPanelContainer>
            <OptionControlList
                placeholder={"Your preset name here"}
                list={presets}
                onAdd={(value) => addPreset(value)}
                onRemove={(id) => removePreset(id)}
                onSelectionChanged={(id) => setSelectedPreset(id)/*{ if(service.getPresetList().find(item => item.id = id)) setSelectedPreset(id)}*/}
                onColorChanged={(color, preset, e) => onPresetColorChanged(color, preset, e)}
            />
            {groupPanelVisible ? (
                <OptionControlList
                    placeholder={"Your group name here"}
                    list={service.getPresetGroups(selectedPreset)}
                    onAdd={(value) => addGroup(value, selectedPreset)}
                    onRemove={(id) => removeGroup(id, selectedPreset)}
                    onSelectionChanged={(id) => setSelectedGroup(id)}
                    onColorChanged={(color, group, e) => onGroupColorChanged(color, group, e)}
                />
            ) : (
                <></>
            )}
        </ControlPanelContainer>
    );
}
