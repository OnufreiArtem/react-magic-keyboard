import { nanoid } from "nanoid";
import React, { useState, useEffect } from "react";
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

export default function KeyBoard({ preset, groups }) {
    const [selectedPreset, setSelectedPreset] = useState(undefined);
    const [selectedGroup, setSelectedGroup] = useState(undefined);
/*
    useEffect(() => {
        const timer = setInterval(() => {
            console.log("Called");
            setSelectedPreset(service.getSPFromStorage());
            setSelectedGroup(service.getSGFromStorage());
        }, 500);

        return () => clearInterval(timer);
    }, [selectedPreset]);

    const kData = constants.KEY_TYPES;

    const colorFromPreset = (value) => {
        if(selectedPreset) {
            if(selectedGroup) {
                return selectedGroup?.keys?.includes(value) ? selectedGroup?.color : `transparent`;
            }
            
            for(const group of selectedPreset.groups) {
                if(group.keys.includes(value)) return group.color;
            }
        } 

        return `transparent`;
    };

    const isInGroup = (value, group) => {
        if(group) {
            return group.keys.includes(value)
        }
        return false;
    }

    const isInOtherGroups = (value, group, preset) => {
        if(group && preset) {
            let isInOther = false;
            for(const grp of preset.groups) {
                if(grp.id === group.id) continue;
                isInOther |= isInGroup(value, grp);
            }
            return isInOther;
        }
        return false;
    }

    const removeFromOtherGroups = (value, group, preset) => {
        if(group && preset) {
            preset.groups = preset.groups.map(grp => {
                if(grp.id === group.id) return grp;
                grp.keys = [...grp.keys.filter(key => key !== value)];
                return grp;
            })
            return preset;
        }

        return undefined;
    }
 
    const isInPreset = (value) => {
        let contains = false;
        
        if(selectedPreset === undefined) return false;

        for(const grp of selectedPreset?.groups) {
            contains |= isInGroup(value, grp)
        }
        return contains;
    }

    return (
        <BoardContainer>
            <KBoardLayout>
                <KBoardLogo color={selectedPreset?.color || `#fff`}>
                    Hyper<LogoFeature>Z</LogoFeature>
                </KBoardLogo>

                <KContainerLayout>
                    {kData.map((kdatum) => (
                        <KButton
                            key={nanoid()}
                            area={kdatum.area}
                            isSelected={!selectedGroup ? isInPreset(kdatum.value) : isInGroup(kdatum.value, selectedGroup)}
                            selectionColor={colorFromPreset(kdatum.value)}
                            value={kdatum.value.toUpperCase()}
                            onClick={() => {
                                if(selectedPreset && selectedGroup) {
                                    if(isInGroup(kdatum.value, selectedGroup)) {
                                        const nGroup = {...selectedGroup, keys: [...selectedGroup.keys.filter(k => k !== kdatum.value)]}
                                        service.updateSelectedGroup(nGroup)
                                        service.updateGroup(nGroup, selectedPreset.id);
                                        service.updateStorage();
                                        console.log('Remove key')
                                    }
                                    else {
                                        const nPreset = removeFromOtherGroups(kdatum.value, selectedGroup, selectedPreset);
                                        if(nPreset !== undefined) {
                                            service.updatePreset(nPreset);
                                            service.updateSelectedPreset(nPreset)
                                        }
                                            
                                        const nGroup = {...selectedGroup, keys: [...new Set([...selectedGroup.keys, kdatum.value])]};
                                        service.updateSelectedGroup(nGroup);
                                        service.updateGroup(nGroup, selectedPreset.id);
                                        service.updateStorage();
                                        console.log('Add key');
                                    }
                                }
                            }}
                        />
                    ))}
                </KContainerLayout>
            </KBoardLayout>
        </BoardContainer>
    );*/
    return (
        <>
        </>
    )
}
