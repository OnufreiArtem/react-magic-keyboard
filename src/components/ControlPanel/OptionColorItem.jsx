import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import PopupPicker from "../ColorPicker/PopupPicker";

const ItemContainer = styled.div`
    box-sizing: border-box;
    padding: 10px 20px;
    font-size: 1.4rem;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: .3s all;
    background-color: ${(props) => (props.selected ? `#ffffff44` : `transparent`)};
    user-select: none;

    &:hover {
        background-color: ${(props) => (props.selected ? `#ffffff88` : `#ffffff66`)};
        transform: translateY(-10%);
    }

`;

const ItemTitle = styled.span`
    overflow: hidden;
    max-width: 300px;
`;

const ControlContainer = styled.span`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const RemoveButton = styled.button`
    width: 40px;
    height: 40px;
    border: none;
    background-color: transparent;
    border-radius: 999px;
    color: white;
    transition: .3s all;
    font-size: 1.2rem;
    margin-left: 20px;

    &:hover {
        background-color: #f05454;
    }
`

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
                <RemoveButton onClick={onRemoveEvent}>
                    <i className="fas fa-trash"></i>
                </RemoveButton>
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
