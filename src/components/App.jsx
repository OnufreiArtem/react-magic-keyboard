import React, { useState } from "react";
import Keyboard from "./Keyboard/Keyboard";

import styled from "styled-components";
import ControlPanel from "./ControlPanel/ControlPanel";

const MainLayout = styled.div`
    display: flex;
`;

const LeftPanel = styled.div`
    background-color: #121211;
    height: 100vh;
    width: 800px;
    padding: 50px 0;
`;

const PanelTitle = styled.span`
    font-weight: bold;
    font-family: 'Zen Dots', cursive;
    display: block;
    font-size: 3rem;
    color: white;
    text-align: center;
`;

const TitleDecorator = styled.span`
    color: red;
`;

const RightPanel = styled.div`
    display: inline-block;
    width: 100%;
`;

function App() {
    const [presets, setPresets] = useState([]);
    const [selectedPreset, setSelectedPreset] = useState(undefined);
    const [selectedGroup, setSelectedGroup] = useState(undefined);

    return (
        <MainLayout>
            <LeftPanel>
                <PanelTitle>
                    Hyper<TitleDecorator>Z</TitleDecorator>
                </PanelTitle>
                <ControlPanel onPresetsChanged={setPresets} onSelectedPresetChanged={setSelectedPreset} onSelectedGroupChanged={setSelectedGroup} />
            </LeftPanel>

            <RightPanel>
                <Keyboard selectedPreset={selectedPreset} selectedGroup={selectedGroup} presets={presets}></Keyboard>
            </RightPanel>
        </MainLayout>
    );
}

export default App;
