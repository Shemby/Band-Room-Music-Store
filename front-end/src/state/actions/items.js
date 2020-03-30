import {
  ITEMS_RECIEVED,
  ITEM_DELETED,
  ITEM_UPDATED,
  ITEM_RECIEVED,
  ITEM_CREATED
} from './types';
import { local } from '../../api';
import Axios from 'axios';

export const getItems = () => {
  return async function(dispatch) {
    const res = await local.get('/items');
    dispatch({ type: ITEMS_RECIEVED, payload: res.data });
  };
};

export const getDetails = item => {
  return {
    type: ITEM_RECIEVED,
    payload: item
  };
};

export const createItem = (item, image) => {
  return async function(dispatch, getState) {
    const state = getState();
    const Authorization = state.loginReducer.header.Authorization;
    const fd = new FormData();
    fd.append('image', image);
    const options = {
      headers: {
        Authorization
      },
      data: item,
      method: 'POST',
      url: 'http://localhost:3000/items'
    };
    const imageOptions = {
      headers: {
        Authorization,
        'Content-Type': 'multipart/form-data'
      }
    };
    const res = await Axios(options);
    await local.patch(`/items/${res.data._id}/image`, fd, imageOptions);
    dispatch({ type: ITEM_CREATED, payload: res.data });
  };
};

export const editItem = item => {
  return async function(dispatch, getState) {
    const state = getState();
    const Authorization = state.loginReducer.header.Authorization;
    const id = state.itemsReducer.currentItem._id;
    const options = {
      headers: {
        Authorization
      },
      data: item,
      method: 'PATCH',
      url: `http:localhost:3000/items/${id}`
    };
    await Axios(options);
    dispatch({ type: ITEM_UPDATED });
  };
};

export const editImage = image => {
  return async function(dispatch, getState) {
    const state = getState();
    const Authorization = state.loginReducer.header.Authorization;
    const current = state.itemsReducer.currentItem._id;
    const fd = new FormData();
    fd.append('image', image);
    const Options = {
      headers: {
        Authorization,
        'Content-Type': 'multipart/form-data'
      },
      method: 'PATCH',
      url: `http:localhost:3000/items/${current}/image`,
      data: fd
    };
    await Axios(Options);
    dispatch({ type: ITEM_UPDATED });
  };
};

export const deleteItem = item => {
  return async function(dispatch, getState) {
    const state = getState();
    const Authorization = state.loginReducer.header.Authorization;
    const options = {
      method: 'DELETE',
      url: `http://localhost:3000/items/${item}`,
      headers: {
        Authorization
      }
    };
    Axios(options);
    dispatch({
      type: ITEM_DELETED,
      payload: item
    });
  };
};
