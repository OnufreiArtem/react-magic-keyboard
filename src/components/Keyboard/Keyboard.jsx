import { nanoid } from "nanoid";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import KButton from './KButton'

const KContainerLayout = styled.div`

    display: grid;
    grid-template-areas: 
        "btn1  btn2  btn3 ebtn"
        "btn4  btn5  btn6 plus"
        "btn7  btn8  btn9 plus"
        "btn10  btn11  btn12 enter"
        "zero zero bbtn enter";
    grid-template-columns: repeat(4, 90px);
    grid-template-rows: repeat(5, 90px);
    gap: 5px;
    
`

const BoardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

const KBoardLayout = styled.div`
    display: inline-block;
    border-radius: 10px;
    padding: 40px;
    background-color: #121211; 
    border-style: solid;
    border-width: 8px 10px;

    border-top-color: #212020;
    border-left-color: #050505;
    border-right-color: #050505;
    border-bottom-color: #302f2f;
`
const KBoardLogo = styled.span`
    display: block;
    color: ${props => props.color || `#fff`};
    font-size: 2rem;
    font-family: 'Zen Dots', cursive;
    margin-bottom: 30px;
`
const LogoFeature = styled.span`
    color: red;
`

export default function KeyBoard({preset}) {

    const kData = [
        {value: "numlk", area: "btn1"},
        {value: "/", area: "btn2"},
        {value: "*", area: "btn3"},
        {value: "-", area: "ebtn"},
        {value: "7", area: "btn4"},
        {value: "8", area: "btn5"},
        {value: "9", area: "btn6"},
        {value: "+", area: "plus"},
        {value: "4", area: "btn7"},
        {value: "5", area: "btn8"},
        {value: "6", area: "btn9"},
        {value: "1", area: "btn10"},
        {value: "2", area: "btn11"},
        {value: "3", area: "btn12"},
        {value: "enter", area: "enter"},
        {value: "0", area: "zero"},
        {value: ".", area: "bbtn"}
    ];

    const colorFromPreset = (value) => {
        let color = `transparent`;
        preset?.groups?.forEach(group => {
            if(group?.keys?.includes(value)) color = group.color;
        });

        return color;
    }

    useEffect(() => {
        console.log(preset?.color)
    }, [preset])



    return(
        <BoardContainer>
            <KBoardLayout>
                <KBoardLogo color={preset?.color || `#fff`}>
                    Hyper<LogoFeature>Z</LogoFeature>
                </KBoardLogo>

                <KContainerLayout>
                    {
                        kData.map(kdatum => <KButton key={nanoid()} area={kdatum.area} selectionColor={colorFromPreset(kdatum.value)} value={kdatum.value.toUpperCase()} />)
                    }
                </KContainerLayout>
            </KBoardLayout>
        </BoardContainer>
    )
}