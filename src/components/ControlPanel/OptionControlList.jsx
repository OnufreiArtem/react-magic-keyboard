import React, { useState } from "react";
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

export default function OptionControlList({
    placeholder,
    list,
    onAdd,
    onRemove,
    onSelectionChanged,
    onColorChanged,
}) {
    const [inputContent, setInputContent] = useState("");
    const [selected, setSelected] = useState(undefined);

    const onClickEvent = (id) => {
        setSelected(id);
        onSelectionChanged(id)
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
                    selected={selected === item.id}
                    onColorChanged={(color, e) => onColorChanged(color, item, e)}
                    onClick={() => onClickEvent(item.id)}
                    onRemoveClicked={() => onRemove(item.id)}
                />
            )}
        </ControlListContainer>
    );
}
