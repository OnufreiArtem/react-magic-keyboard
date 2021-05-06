import { nanoid } from "nanoid";
import React from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";

import * as constants from "../constants";
import * as service from "../utils"

import KButton from "./KButton";

const KContainerLayout = styled.div`
    display: grid;
    grid-template-areas:
        "btn1  btn2  btn3 ebtn"
        "btn4  btn5  btn6 plus"
        "btn7  btn8  btn9 plus"
        "btn10  btn11  btn12 enter"
        "zero zero bbtn enter";
    grid-template-columns: repeat(4, 90px);
    grid-template-rows: repeat(5, 90px);
    gap: 5px;
`;

const BoardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const KBoardLayout = styled.div`
    display: inline-block;
    border-radius: 10px;
    padding: 40px;
    background-color: #121211;
    border-style: solid;
    border-width: 8px 10px;

    border-top-color: #212020;
    border-left-color: #050505;
    border-right-color: #050505;
    border-bottom-color: #302f2f;
    user-select: none;
`;

const KBoardLogo = styled.span`
    display: block;
    color: ${(props) => props.color || `#fff`};
    font-size: 2rem;
    font-family: "Zen Dots", cursive;
    margin-bottom: 30px;
`;

const LogoFeature = styled.span`
    color: red;
`;

function Keyboard({ presets, selectedPreset = undefined, selectedGroup = undefined }) {

    return (
        <BoardContainer>
            <KBoardLayout>
                <KBoardLogo color={presets.find(prs => prs.id === selectedPreset)?.color || `#fff`}>
                    Hyper<LogoFeature>Z</LogoFeature>
                </KBoardLogo>

                <KContainerLayout>
                    {constants.KEY_TYPES.map((kdatum) => (
                        <KButton
                            key={nanoid()}
                            area={kdatum.area}
                            isSelected={service.isBtnSelected(kdatum.value, selectedPreset, selectedGroup)}
                            selectionColor={service.peakColor(kdatum.value, selectedPreset, selectedGroup)}
                            value={kdatum.value.toUpperCase()}
                            onClick={state => state ? service.addKey(kdatum.value, selectedGroup, selectedPreset) : service.removeKey(kdatum.value, selectedGroup, selectedPreset)}
                        />
                    ))}
                </KContainerLayout>
            </KBoardLayout>
        </BoardContainer>
    );
}


Keyboard.propTypes = {
    presets: PropTypes.arrayOf(PropTypes.object),
    selectedPreset: PropTypes.string,
    selectedGroup: PropTypes.string,
}

export default Keyboard;