import React, { useState } from 'react';
import PropTypes from 'prop-types';

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

function KButton({area, selectionColor, value, isSelected, onClick}) {

    const [selected, setSelected] = useState(isSelected)

    const clickEvent = () => {
        onClick(!selected);
        setSelected(!selected);
    }

    return <KButtonLayout area={area} color={selectionColor || `#fff`} selected={selected} onMouseDown={clickEvent}>{value}</KButtonLayout>
}

KButton.propTypes = {
    area: PropTypes.string,
    selectionColor: PropTypes.string,
    value: PropTypes.string,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func,
}

export default KButton;

