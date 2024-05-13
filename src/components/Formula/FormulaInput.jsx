import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import useAPI from '../../hooks/useAPI';
import SuggestionsList from './SuggestionsList';
import useStore from '../../store/useStore';

const Textarea = styled.textarea`
  display: flex;
  font-size: 16px;
  outline: none;
  width: 100%;
  height: 20px;
  border: none;
`;

const Selected_data_box = styled.div`
  display: flex;
  margin-left: 50px;
`;

const Selected_data = styled.div`
  display: flex;
`;

const Pre = styled.pre`
  span {
    display: flex;
    align-items: center;
    gap: 5px;
    height: 16px;
    margin-left: 5px;
    border: 1px solid #adacad;
    padding: 5px;
    border-radius: 5px;
    background-color: #dedcde;
  }
`;

const MathSymbol = styled.span`
  display: flex;
  align-items: center;
  margin-left: 5px;
`;

const FormulaInput = () => {
  const selectedData = useStore((state) => state.selectedData);
  const updateSelectedDataValue = useStore(
    (state) => state.updateSelectedDataValue
  );
  const { data, loading } = useAPI(
    'https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete'
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(selectedData.name);
  const [editingId, setEditingId] = useState(null);
  const [mathSymbols, setMathSymbols] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if(/[\s+\-*/()^](?![a-zA-Z])/.test(value)) {
      setMathSymbols([...mathSymbols, value]);
    }
    const lastWord = value.split(/[\s+\-*/()^]/).pop();
    if (data && data.length > 0 && lastWord) {
      useStore.setState({
        filteredSuggestions: data.filter((item) =>
          item.name.toLowerCase().includes(lastWord.toLowerCase())
        ),
      });
      setShowSuggestions(true);
    }
  };

  const updateSelectedValueHandler = (e) => {
    if (e.key === 'Enter') {
      const id = e.target.id;
      const newValue = e.target.value;
      updateSelectedDataValue(id, Number(newValue));
      setEditingId(null);
    }
  };

  const deleteLastHandler = (e) => {
    if (e.key === 'Backspace' && inputValue === '') {
      useStore.getState().deleteLastSelectedData();
    }
  }

  return (
    <>
      <Selected_data_box>
        {selectedData.length > 0 &&
          selectedData.map((data, index) => (
            <Fragment key={data.id} >
            <Selected_data>
              <Pre onClick={() => setEditingId(data.id)}>
                <span>
                  {`${data.name} | `}{' '}
                  <p>{`${data.updated ? data.value : '[x]'}`}</p>
                  {editingId === data.id && (
                  <input
                    onKeyDown={(e) => updateSelectedValueHandler(e)}
                    type="text"
                    id={data.id}
                  />
                )}
                </span>
              </Pre>
            </Selected_data>
            {mathSymbols[index] && <MathSymbol>{mathSymbols[index]}</MathSymbol>}
            </Fragment>
          ))}
      </Selected_data_box>
      <Textarea
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyUp={(e) => {
          deleteLastHandler(e)}
        }
      ></Textarea>
      {showSuggestions && (
        <SuggestionsList
          setShowSuggestions={setShowSuggestions}
          setInputValue={setInputValue}
        />
      )}
    </>
  );
};

export default FormulaInput;
