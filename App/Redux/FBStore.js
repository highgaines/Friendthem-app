import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import FBSDK, { LoginManager, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';
import SInfo from 'react-native-sensitive-info';

/* ------------- Actions -------------- */

const _fbAuth = (error, result) =>  {
  if (error) {
    alert("login has error: " + result.error);
  } else if (result.isCancelled) {
    alert("login is cancelled.");
  } else {
      AccessToken.getCurrentAccessToken().then((data) => {
        _getFbProfile(data.accessToken)
        SInfo.setItem('userFBAccessToken', data.accessToken, {})
      })
  }
}

const _getFbProfile = (accessToken) => {
  const responseInfoCallback = (error, result) => {
    if (error) {
      console.log(error)
      alert('Error fetching data: ' + error.toString());
    } else {
      SInfo.setItem('userFBProfile', result, {})
    }
  }
  const infoRequest = new GraphRequest(
    '/me',
    {
      accessToken: accessToken,
      parameters: {
        fields: {
          string: 'email,name,first_name,middle_name,last_name,id,picture'
        }
      }
    },
    responseInfoCallback
  );

// Start the graph request.
  new GraphRequestManager().addRequest(infoRequest).start();

}

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  login: ['error', 'result']
})

export const FBAPITypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fbAccessToken: ''
})

/* ------------- Reducers ------------- */
const fbLogin = (state = INITIAL_STATE, action) => {
  _fbAuth(action.error, action.result);

  return { ...state }
}



/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN]: fbLogin
})
