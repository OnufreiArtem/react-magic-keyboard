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

export default function KButton(props) {
    const {area, selectionColor, value, isSelected} = props;
    const [selected, setSelected] = useState(isSelected);

    const clickEvent = () => {
        props.onClick(!selected);
        setSelected(!selected);
    }

    useEffect(() => {
        //console.log(`Is selected is : ${isSelected}`)
    })


    return <KButtonLayout area={area} color={'#fff'} selected={selected} onClick={() => clickEvent()}>{value}</KButtonLayout>
}