import { useDispatch as useDispatchReact } from 'react-redux';

export const useDispatch = () => {
    const dispatch = useDispatchReact();
    return (path, value) => {
        dispatch({
            type: 'SET_FIELD',
            payload: { path, value },
        });
    };
};