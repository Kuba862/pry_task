import React from 'react';
import useStore from '../../store/useStore';
import styled from 'styled-components';

const Suggestions_box = styled.div`
  position: absolute;
  width: 25%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  z-index: 1;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ececec;
      &:hover {
        background-color: #f5f5f5;
      }
    }
  }
`;

const Items_box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const Name = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  .name {
  color: #000;    
  }
  .value {
    color: #969696;
  }
`;

const Category = styled.div`
  align-self: flex-start;
  p {
    color: #969696;
  }
`;

const SuggestionsList = ({ setShowSuggestions, setInputValue }) => {
  const list = useStore((state) => state.filteredSuggestions);
  
  const addToSelectedData = useStore((state) => state.addToSelectedData);

  return (
    <Suggestions_box>
      <ul>
        {list.map((item, index) => (
          // I used index because there are several repeated objects in the API with the same data
          <li key={index} onClick={() => {
            addToSelectedData(item);
            setShowSuggestions(false);
            setInputValue('');
            }} >
            <Items_box>
              <Name>
                <p className='name' >{item.name}</p>
                <p className='value' >{item.value}</p>
              </Name>
              <Category>
                <p>{item.category}</p>
              </Category>
            </Items_box>
          </li>
        ))}
      </ul>
    </Suggestions_box>
  );
};

export default SuggestionsList;
