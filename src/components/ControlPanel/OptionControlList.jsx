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
`;

const AddBtn = styled.button``;

const ControlListContainer = styled.div`
    padding: 10px;
`;

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
        //setSelected(nSelected);
        onSelectionChanged(nSelected)
    }

    return (
        <ControlListContainer>
            <AddInput
                placeholder={placeholder || ""}
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
            />
            <AddBtn onClick={() => onAdd(inputContent)}>Add</AddBtn>
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