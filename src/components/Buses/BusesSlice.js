
import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    busesData: [],
    status: "idle"
}

const busesSlice = createSlice({
    name: "buses",
    initialState,
    reducers: ({
        addBuses(state, actions) {
            const findItem = state.busesData.find(({ id }) => id === actions.payload.id)
            if (!findItem) {
                state.busesData.push(actions.payload)
            }
        }
    })
})

export const { addBuses } = busesSlice.actions
export default busesSlice.reducer