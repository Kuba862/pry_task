import { create } from 'zustand';

const useStore = create((set) => ({
  selectedData: [],
  filteredSuggestions: [],
  formulaTitle: 'New Formula',
  updateFormulaTitle: (newTitle) => set({ formulaTitle: newTitle }),
  updateFilteredSuggestions: (inputValue) => set(state => ({ 
    filteredSuggestions: state.data
      .filter(item => item.name.toLowerCase().startsWith(inputValue.toLowerCase()))
      .sort((a, b) => a.name.length - b.name.length)
  })),
  addToSelectedData: (item) => set(state => ({ selectedData: [...state.selectedData, item] })),
  updateSelectedDataValue: (id, newValue) => set(state => ({
  selectedData: state.selectedData.map(item => 
    item.id === id ? { ...item, value: newValue, updated: true } : item
  )
})),
deleteLastSelectedData: () => set(state => ({ selectedData: state.selectedData.slice(0, -1) })),
}));

export default useStore;
