import React from "react";

import styled from "styled-components";

import PopupPicker from "../ColorPicker/PopupPicker";

const ItemContainer = styled.div`
    padding: 20px;
    font-size: 1.4rem;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: ${(props) => (props.selected ? `#ccc` : `transparent`)};
`;

const ItemTitle = styled.span``;

const ControlContainer = styled.span`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export default function OptionColorItem({
    title,
    color,
    selected,
    onColorChanged,
    onClick,
    onRemoveClicked,
}) {
    return (
        <ItemContainer selected={selected} onClick={() => onClick()}>
            <ItemTitle>{title}</ItemTitle>
            <ControlContainer>
                <PopupPicker color={color}
                    onChange={(color, e) => onColorChanged(color, e)}
                ></PopupPicker>
                <button onClick={(e) => {e.stopPropagation(); onRemoveClicked()}}>Remove</button>
            </ControlContainer>
        </ItemContainer>
    );
}
