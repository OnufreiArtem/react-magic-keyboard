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
    }

    return (
        <ColorSquareLayout onClick={(e) => e.stopPropagation()}>
            <ColorSquare color={colorPicked} onClick={e => {setShowPicker(!showPicker)}}></ColorSquare>
            { showPicker && (
                <PickerContainer>
                    <HexColorPicker color={colorPicked} onChange={ (color, e) => {setColorPicked(color)}} />
                    <button onClick={(e) => onChangeEvent(colorPicked, e)}>Save color</button>
                </PickerContainer>
            ) }
        </ColorSquareLayout>
    )
    
}