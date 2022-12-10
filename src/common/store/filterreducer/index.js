import { createSlice, current } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name: 'filterState',
    initialState: {
        filter: [],
        modifyProxy: true,
    },
    reducers: {
        updateFilter: (state, action) => {
            const newFilterList = [...state.filter, action.payload];
            state.filter = [...newFilterList]
        },

        addFilterState: (state, action) => {
            const name_list = current(state.filter).map((ele) => ele.props.name)
            const payload = action.payload.filter((ele) => !name_list.includes(ele.props.name));

            state.filter = [...state.filter, ...payload]
        },

        removeFilterState: (state, action) => {
            const deleteIndex = state.filter.indexOf(action.payload);
            const newFilter = [...state.filter];

            newFilter.splice(deleteIndex, 1);
            state.filter = [...newFilter];
            /*const filter = current(state.filter);

            filter.length ? state.filter = filter.filter((ele) => {
                return ele.props.name != action.payload
            }): null;*/
        },

        removeAllFilter: (state, action) => {
            state.filter = [];
        }
    },
})

export const { addFilterState, removeFilterState, updateFilter, removeAllFilter } = filterSlice.actions

export default filterSlice.reducer