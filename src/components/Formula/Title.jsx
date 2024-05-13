import React, { useState } from 'react';
import useStore from '../../store/useStore';
import styled from 'styled-components';

const Formula_title = styled.div`
    position: relative;
    width: 100%;
    font-size: 16px;
    padding: 8px;
    cursor: pointer;
    background-color: #bdbdbd;
    input {
        font-size: 24px;
        font-weight: bold;
        border: none;
        outline: none;
    }
`

const Title = () => {
    const [updateTitle, setUpdateTitle] = useState(false);
    const [newTitle, setNewTitle] = useState("");

    const oldTitle = useStore((state) => state.formulaTitle);
    const saveNewTitle = useStore((state) => state.updateFormulaTitle);

    const updateTitleHandler = () => {
        setUpdateTitle(true);
    };

    const saveTitleHandler = (e) => {
        if(e.keyCode === 13) {
            saveNewTitle(newTitle);
            setUpdateTitle(false);
        }
    }

  return (
    <Formula_title onClick={updateTitleHandler} >
        {oldTitle}
        {updateTitle && <input type="text" onKeyDown={saveTitleHandler} onChange={(e) => setNewTitle(e.target.value)} />}
    </Formula_title>
  )
}

export default Title