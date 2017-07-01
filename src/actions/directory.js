import { validateDirectory as apivalidateDirectory } from '../api/index';

export const VALIDATE_DIRECTORY = 'VALIDATE_DIRECTORY';
export const VALIDATE_DIRECTORY_SUCCESS = 'VALIDATE_DIRECTORY_SUCCESS';
export const VALIDATE_DIRECTORY_FAILURE = 'VALIDATE_DIRECTORY_FAILURE';


export const validateDirectorySuccess = (directory) => (
  {
    type: VALIDATE_DIRECTORY_SUCCESS,
    payload: directory
  }
);

export const validateDirectoryFailure = (error) => (
  {
    type: VALIDATE_DIRECTORY_FAILURE,
    payload: error
  }
);

export const validateDirectory = (directory) => {
  return (dispatch,getState) => {
    if (apivalidateDirectory(directory)){
      return Promise.resolve(dispatch(validateDirectorySuccess(directory)));
    } else {
      return Promise.resolve(dispatch(validateDirectoryFailure('Invalid directory')));    
    }
  }
}

