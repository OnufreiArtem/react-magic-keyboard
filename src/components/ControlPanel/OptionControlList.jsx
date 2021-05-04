import React, { useState } from "react";
import { nanoid } from 'nanoid';

import * as service from "../utils";

import styled from "styled-components";
import OptionColorItem from "./OptionColorItem";
import { isDOMComponentElement } from "react-dom/test-utils";

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

    return (
        <ControlListContainer>
            <AddInput
                placeholder={placeholder || ""}
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
            />
            <AddBtn onClick={() => onAdd(inputContent)}>Add</AddBtn>
            {list.map((item) => 
                <OptionColorItem
                    title={item.title}
                    color={item.color}
                    key={nanoid()}
                    selected={selected === item.id}
                    onColorChanged={(color, e) => onColorChanged(color, item, e)}
                    onClick={() => {setSelected(item.id); onSelectionChanged(item.id)}}
                    onRemoveClicked={() => onRemove(item.id)}
                />
            )}
        </ControlListContainer>
    );
}
