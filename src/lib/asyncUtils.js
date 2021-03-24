export const createPromiseThunk = (type, promiseCreator) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return param => async dispatch => {
        // 요청 시작
        dispatch({type, param});
        try {
            // 결과물의 이름을 payload 라는 이름으로 통일시킵니다.
            const payload = await promiseCreator(param);
            dispatch({type: SUCCESS, payload}); // 성공
        } catch (e) {
            dispatch({type: ERROR, payload: e, error: true}); // 실패
        }
    };
}

export const reducerUtils = {
    initial: (initialDate = null) => ({
        loading: false,
        data: initialDate,
        error: null
    }),
    loading: (prevState = null) => ({
        loading: true,
        data: prevState,
        error: null
    }),
    success: payload => ({
        loading: false,
        data: payload,
        error: null
    }),
    error: error => ({
        load: false,
        data: null,
        error: error
    })
}

export const handleAsyncActions = (type, key, keepData = false) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return (state, action) => {
        switch (action.type) {
            case type:
                return {
                    ...state,
                    [key]: reducerUtils.loading(keepData ? state[key].data : null)
                }
            case SUCCESS:
                return {
                    ...state,
                    [key]: reducerUtils.success(action.payload)
                }
            case ERROR:
                return {
                    ...state,
                    [key]: reducerUtils.error(action.error)
                }
            default:
                return state;
        }
    }
}

const defaultIdSelector = param => param;
export const createPromiseThunkById = (type, promiseCreator, idSelector = defaultIdSelector) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return param => async dispatch => {
        const id = idSelector(param);
        dispatch({type, meta: id});
        try {
            // 결과물의 이름을 payload 라는 이름으로 통일시킵니다.
            const payload = await promiseCreator(param);
            dispatch({type: SUCCESS, payload, meta: id}); // 성공
        } catch (e) {
            dispatch({type: ERROR, payload: e, error: true, meta: id}); // 실패
        }
    };
}

export const handleAsyncActionsById = (type, key, keepData = false) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return (state, action) => {
        const id = action.meta;
        switch (action.type) {
            case type:
                return {
                    ...state,
                    [key]: {
                        ...state[key],
                        [id]:reducerUtils.loading(
                            keepData?state[key][id]&&state[key][id].data:null
                        )
                    }
                }
            case SUCCESS:
                return {
                    ...state,
                    [key]:{
                        ...state[key],
                        [id]:reducerUtils.success(action.payload)
                    }
                }
            case ERROR:
                return {
                    ...state,
                    [key]:{
                        ...state[key],
                        [id]:reducerUtils.error(action.payload)
                    }
                }
            default:
                return state;
        }
    }
}