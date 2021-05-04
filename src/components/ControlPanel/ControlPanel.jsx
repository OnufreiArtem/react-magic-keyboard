import { nanoid } from "nanoid";
import React, { useState } from "react";

import styled from "styled-components";
import OptionControlList from "./OptionControlList";

import * as service from "../utils";

const ControlPanelContainer = styled.div`
    padding: 20px;
`;

export default function ControlPanel(props) {
    const [presets, setPresets] = useState(service.getPresetListRef());
    const [selection, setSelection] = useState(undefined);

    const addPreset = (value) => {
        service.addPreset(service.preset(value, "#fff"));
        service.updateStorage();
        setPresets(service.getPresetList());
        console.log(`adding ${value}`);
    };

    const removePreset = (id) => {
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
        service.addGroup(service.group(value, '#fff'), presetId);
        service.updateStorage();
        setPresets(service.getPresetList());
    }

    const removeGroup = (id, presetId) => {
        service.removeGroup(id, presetId)
        service.updateStorage();
        setPresets(service.getPresetList());
    }

    return (
        <ControlPanelContainer>
            <OptionControlList
                placeholder={"Your preset name here"}
                list={presets}
                onAdd={(value) => addPreset(value)}
                onRemove={(id) => removePreset(id)}
                onSelectionChanged={(id) => setSelection(id)}
                onColorChanged={(color, preset, e) => onPresetColorChanged(color, preset, e)}
            />
            {selection ? (
                <OptionControlList
                    placeholder={"Your group name here"}
                    list={service.getPresetGroups(selection)}
                    onAdd={(value) => addGroup(value, selection)}
                    onRemove={(id) => removeGroup(id, selection)}
                    onSelectionChanged={(id) => setSelection(id)}
                    onColorChanged={(color, group, e) => onGroupColorChanged(color, group, e)}
                />
            ) : (
                <></>
            )}
        </ControlPanelContainer>
    );
}
