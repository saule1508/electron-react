import { readContent as apireadContent } from '../api/index';

export const READ_CONTENT = 'READ_CONTENT';
export const READ_CONTENT_SUCCESS = 'READ_CONTENT_SUCCESS';
export const READ_CONTENT_FAILURE = 'READ_CONTENT_FAILURE';


export const readContentSuccess = (content) => ({
  type: READ_CONTENT_SUCCESS,
  payload: content
});

export const readContentFailure = (error) => ({
  type: READ_CONTENT_FAILURE,
  payload: error
});

export const readContent = (directory) => {
  return (dispatch,getState) => {
    let result = apireadContent(directory);
    if (! result.error){
      return Promise.resolve(dispatch(readContentSuccess(result.doc)));
    } else {
      return Promise.resolve(dispatch(readContentFailure(result.error)));    
    }
  }
}

