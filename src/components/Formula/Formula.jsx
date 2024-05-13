import React, { useState } from 'react'
import Title from './Title';
import styled from 'styled-components';
import FormulaInput from './FormulaInput';

const Formula_box = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #ececec;
    padding: 20px;
    margin: 10px;
    border-radius: 5px;
`;

const Title_and_btn_box = styled.div`
display: flex;
justify-content: flex-start;
    button {
        width: 30px;
        height: 30px;
        background-color: transparent;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
        transform: ${(props) => props.trianglerotate ? "rotate(90deg)" : "rotate(0deg)"};
        svg {
            fill: #4a4a4a;
            width: 15px;
            height: 15px;
        }
    }
`;

const Input_box = styled.div`
    display: flex;    
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
`;


const Formula = () => {
    const [triangleRotate, setTriangleRotate] = useState(false);

    const rotateTriangle = () => {
        setTriangleRotate(!triangleRotate);
    }

  return (
    <Formula_box>
        <Title_and_btn_box trianglerotate={triangleRotate} >
        <button onClick={rotateTriangle} >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>
        </button>
        <Title />
        </Title_and_btn_box>
        <Input_box>
            {triangleRotate &&  <FormulaInput />}
        </Input_box>
    </Formula_box>
  )
}

export default Formula