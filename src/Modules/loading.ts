const LOADING = 'loading/LOADING';
const LOADING_FIN = 'loading/LOADING_FIN';
export const setLoading = () => ({
    type: LOADING,
    payload: true
});
export const finishLoading = () => ({
    type: LOADING_FIN,
    payload: false
});

const initialState = false;

export default function loading(state: boolean = initialState, action: any) {
    switch(action.type) {
        case LOADING:
            return action.payload;
        case LOADING_FIN:
            return action.payload;
        default:
            return initialState;
    }
}