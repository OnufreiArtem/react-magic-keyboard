import React, { useState, useEffect } from 'react'

import styled from 'styled-components';

const KButtonLayout = styled.div`
    grid-area: ${props => props.area || 'btn'};
    background-color: #121211;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .3s all;
    cursor: pointer;
    border-radius: 10px;

    color: white;
    
    box-shadow: 0 0 10px ${props => props.selected ? (props.color || `white`) : `transparent`};
    

    border-style: solid;
    border-width: 8px 10px;

    
    border-top-color: #212020;
    border-left-color: #050505;
    border-right-color: #050505;
    border-bottom-color: #302f2f;



    &:hover {
        outline: 2px solid red;
    }

`

export default function KButton({area, selectionColor, value, isSelected, onClick}) {

    const [selected, setSelected] = useState(isSelected)

    const clickEvent = () => {
        console.log("KButton clicked")
        onClick(!selected);
        setSelected(!selected);
    }

    return <KButtonLayout area={area} color={selectionColor || `#fff`} selected={selected} onMouseDown={() => clickEvent()}>{value}</KButtonLayout>
}