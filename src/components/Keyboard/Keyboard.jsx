import { nanoid } from "nanoid";
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";

import * as constants from "../constants";
import * as service from "../utils";

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

    const addKey = (key, groupId, presetId) => {
        let listCopy = [...getListFromStore()];

        console.log(listCopy)
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
        console.log(listCopy)

        window.localStorage.setItem(
            constants.PRESETS_STORAGE,
            JSON.stringify([...listCopy])
        );
        updateList();
    }

    const removeKey = (key, groupId, presetId) => {

        let listCopy = [...getListFromStore()];

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

        window.localStorage.setItem(
            constants.PRESETS_STORAGE,
            JSON.stringify([...listCopy])
        );
        updateList();

    }

    useEffect(() => {
        updateList();
        updateSelPreset();
        updateSelGroup();
    }, [])

    const getListFromStore = () => {
        return [...JSON.parse(window.localStorage.getItem(constants.PRESETS_STORAGE)) || []]
    }

    const updateList = () => {
        const list = JSON.parse(
            window.localStorage.getItem(constants.PRESETS_STORAGE)
        );
        //setPresets(list || []);
        console.log("Updated preset list in Keyboard")
    }

    const updateSelPreset = () => {
        const prs = JSON.parse(
            window.localStorage.getItem(constants.SELECTED_PRESET)
        );
        //setSelectedPreset(prs === "none" ? undefined : prs);
        console.log("Updated selected preset in Keyboard")
    }
    const updateSelGroup = () => {
        const grp = JSON.parse(
            window.localStorage.getItem(constants.SELECTED_GROUP)
        );
       
        //setSelectedGroup(grp === "none" ? undefined : grp);
        console.log("Updated selected group in Keyboard")
    }

    const isBtnSelected = (value, presetId, groupId) => {
        if(presetId === undefined) return false;
        if(groupId === undefined) return getListFromStore().find(prs => prs.id === presetId)?.groups.reduce((acc, curr) => [...acc, ...curr.keys], []).includes(value)
        return getListFromStore().
            find(prs => prs.id === presetId)?.groups.
            find(grp => grp.id === groupId)?.keys.includes(value) || false;
    }

    const peakColor = (value, presetId, groupId) => {
        if(presetId) {
            if(groupId) {
                return getListFromStore().find(prs => prs.id === presetId).groups.find(grp => grp.id === groupId)?.color || "#fff"           
            }
            return getListFromStore().find(prs => prs.id === presetId).groups.find(grp => grp.keys.includes(value))?.color || '#fff'
        }

        return '#fff';
    }

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
                            isSelected={isBtnSelected(kdatum.value, selectedPreset, selectedGroup)}
                            selectionColor={peakColor(kdatum.value, selectedPreset, selectedGroup)}
                            value={kdatum.value.toUpperCase()}
                            onClick={state => state ? addKey(kdatum.value, selectedGroup, selectedPreset) : removeKey(kdatum.value, selectedGroup, selectedPreset)}
                        />
                    ))}
                </KContainerLayout>
            </KBoardLayout>
        </BoardContainer>
    );
}


Keyboard.propTypes = {
    presets: PropTypes.arrayOf(PropTypes.object),
    selectedPreset: PropTypes.object,
    selectedGroup: PropTypes.object,
}

export default Keyboard;