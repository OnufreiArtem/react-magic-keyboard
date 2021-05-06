import React from "react";
import PropTypes from "prop-types";
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

function OptionColorItem({
    title,
    color,
    selected,
    onColorChanged,
    onClick,
    onRemoveClicked,
}) {
    const onRemoveEvent = (e) => {
        e.stopPropagation();
        onRemoveClicked();
    };

    return (
        <ItemContainer selected={selected} onClick={onClick}>
            <ItemTitle>{title}</ItemTitle>
            <ControlContainer>
                <PopupPicker
                    color={color}
                    onChange={onColorChanged}
                ></PopupPicker>
                <button onClick={onRemoveEvent}>Remove</button>
            </ControlContainer>
        </ItemContainer>
    );
}

OptionColorItem.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
    selected: PropTypes.bool,
    onColorChanged: PropTypes.func,
    onClick: PropTypes.func,
    onRemoveClicked: PropTypes.func,
};

export default OptionColorItem;
