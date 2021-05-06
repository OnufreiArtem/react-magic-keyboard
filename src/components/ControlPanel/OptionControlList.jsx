import React, { useState } from "react";
import PropTypes from 'prop-types';

import { nanoid } from 'nanoid';

import styled from "styled-components";
import OptionColorItem from "./OptionColorItem";

const AddInput = styled.input`
    display: block;
    padding: 10px;
    font-size: 1.4rem;
    border: none;
    border-radius: 10px;
    width: 100%;

    &:focus { 
        outline: none;
    }
`;

const AddBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    font-size: 1.4rem;
    border: none;
    border-radius: 999px;
    padding: 30px;
    color: white;
    margin: 20px;
    background-color: transparent;
    transition: .3s all;
    
    &:hover {
        background-color: #cccccc55;
    }

    &:focus { 
        outline: none;
    }

`;

const ControlListContainer = styled.div`
    padding: 10px;
`;

const ControlsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

function OptionControlList({
    placeholder,
    list,
    selectedId,
    areItemsToggle = false,
    onAdd,
    onRemove,
    onSelectionChanged,
    onColorChanged,
}) {
    const [inputContent, setInputContent] = useState("");

    const onClickEvent = (id) => {
        let nSelected = undefined;
        nSelected = (areItemsToggle && id === selectedId) ? undefined : id;
        onSelectionChanged(nSelected)
    }

    const onAddEvent = () => {
        if(inputContent === '') return;
        onAdd(inputContent);
        setInputContent('');
    }

    const onKeyEvent = (e) => {
        if (e.key === "Enter") {
            onAddEvent();
        }
    }

    return (
        <ControlListContainer>
            <ControlsContainer>
                <AddInput
                    placeholder={placeholder || ""}
                    value={inputContent}
                    onChange={(e) => setInputContent(e.target.value)}
                    onKeyDown={(e) => onKeyEvent(e)}
                />
                <AddBtn onClick={onAddEvent}>
                    <i className="fas fa-plus"></i>
                </AddBtn>
            </ControlsContainer> 
            
            {list?.map((item) => 
                <OptionColorItem
                    title={item.title}
                    color={item.color}
                    key={nanoid()}
                    selected={selectedId === item.id}
                    onColorChanged={(color, e) => onColorChanged(color, item, e)}
                    onClick={() => onClickEvent(item.id)}
                    onRemoveClicked={() => onRemove(item.id)}
                />
            )}
        </ControlListContainer>
    );
}

OptionControlList.propTypes = {
    placeholder: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.object),
    selectedId: PropTypes.string,
    areItemsToggle: PropTypes.bool,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    onSelectionChanged: PropTypes.func,
    onColorChanged: PropTypes.func,
}

export default OptionControlList;