import React, { useState } from 'react';
import { HexColorPicker } from "react-colorful";
import styled from 'styled-components';
import PropTypes from 'prop-types';


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

function PopupPicker({color, onChange}) {
    
    const [showPicker, setShowPicker] = useState(false);
    const [colorPicked, setColorPicked] = useState(color);

    const onChangeEvent = (color, e) => {
        onChange(color, e);
    }

    const onSquarePressed = (e) => {
        if(showPicker) onChangeEvent(colorPicked, e)
        setShowPicker(!showPicker);
    }

    return (
        <ColorSquareLayout onClick={(e) => e.stopPropagation()}>
            <ColorSquare color={colorPicked} onClick={onSquarePressed}></ColorSquare>
            { showPicker && (
                <PickerContainer>
                    <HexColorPicker color={colorPicked} onChange={(color, _) => setColorPicked(color)} />
                    <button onClick={(e) => onChangeEvent(colorPicked, e)}>Save color</button>
                </PickerContainer>
            ) }
        </ColorSquareLayout>
    )
    
}

PopupPicker.propTypes = {
    color: PropTypes.string,
    onChange: PropTypes.func,
}


export default PopupPicker;