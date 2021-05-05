import React, { useState } from 'react';
import { HexColorPicker } from "react-colorful";
import styled from 'styled-components'


const ColorSquareLayout = styled.div`
`

const ColorSquare = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 3px solid #fff;
    background-color: ${props => props.color || `#fff`};
    cursor: pointer;

`

const PickerContainer = styled.div`
    position: absolute;
`

export default function PopupPicker(props) {
    
    const [showPicker, setShowPicker] = useState(false);
    const [colorPicked, setColorPicked] = useState(props.color);

    const onChangeEvent = (color, e) => {
        props.onChange(color, e);
        setColorPicked(color);
    }

    return (
        <ColorSquareLayout>
            <ColorSquare color={colorPicked} onClick={e => {e.stopPropagation(); setShowPicker(!showPicker)}}></ColorSquare>
            { showPicker && (
                <PickerContainer>
                    <HexColorPicker color={colorPicked} onChange={ (color, e) => onChangeEvent(color, e)} />
                </PickerContainer>
            ) }
        </ColorSquareLayout>
    )
    
}