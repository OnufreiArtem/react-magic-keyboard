import React, { useState } from 'react';
import { HexColorPicker } from "react-colorful";
import styled from 'styled-components';
import PropTypes from 'prop-types';


const ColorSquareLayout = styled.div`
    position: relative;
`

const ColorSquare = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 3px solid #fff;
    background-color: ${props => props.color || `#fff`};
    cursor: pointer;
    transition: .3s all;

    &:hover {
        border: 3px solid #ffffff55;
    }

`

const PickerContainer = styled.div`
    position: absolute;
    transform: translateY(-50%) translateX(70%);
    padding: 10px;
    border-radius: 10px;
    background-color: #11111122;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px;
`

const ActionButton = styled.button`
    display: block;
    height: 40px;
    border: none;
    background-color: #f0d154;
    border-radius: 999px;
    font-size: 1.2rem;
    color: black;
    padding: 5px 15px;
    transition: .3s all;

    &:hover {
        background-color: #f0de54;
    }

`

const ActionButtonText = styled.span`
    margin-left: 10px;
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
                    <ButtonContainer>
                        <ActionButton onClick={(e) => onChangeEvent(colorPicked, e)}>
                            <i className="fas fa-save"></i>
                            <ActionButtonText>Save</ActionButtonText>
                        </ActionButton>
                    </ButtonContainer>
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