import React, { Component } from 'react';
import './App.css';
import Cards from './Cards';
import {GlobalContext} from './index';
import Bin from './Bin';

class App extends Component {
  state = {
    list: ['Дело 1','Дело 2', 'Дело 3'],
    value: '',
    binlist: [],
  }
  
  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  componentDidMount () {
    this.hydrateStateWithLocalStorage();
  }

  handleChange = ({ target: { value }}) => {
    this.setState({ value });
  }

  handleClickAdd = () => {
    this.state.list.push(this.state.value);   
    this.setState({ list: this.state.list, value: '', binlist: this.state.binlist });
    localStorage.setItem('list', JSON.stringify(this.state.list));
  }

  handleClickDel = (i) => {
    this.state.binlist.push(this.state.list[i]);    
    this.state.list.splice(i, 1);
    this.setState({ list: this.state.list, value: '', binlist: this.state.binlist});
    localStorage.setItem('binlist', JSON.stringify(this.state.binlist));
    localStorage.setItem('list', JSON.stringify(this.state.list));
  }

  handleClickSort = () => {
    this.state.list.sort();
    this.setState({ list: this.state.list, value: ''});
    localStorage.setItem('list', JSON.stringify(this.state.list));
  }

  handleClickReset = (i) => {
    this.state.list.push(this.state.binlist[i]);
    this.state.binlist.splice(i, 1);
    this.setState({ list: this.state.list, value: '', binlist: this.state.binlist});
    localStorage.setItem('list', JSON.stringify(this.state.list));
    localStorage.setItem('binlist', JSON.stringify(this.state.binlist));
  }

  handleClickClear = () => {
    this.state.binlist = [];
    this.setState({ binlist: this.state.binlist });
    localStorage.setItem('binlist', JSON.stringify(this.state.binlist));
  }
  
  //Провайдер распространяется только на компонент Cards, 
  //чтобы корзина работала, нужно его распространить на маршрут /Bin
  //иначе функции в Bin не работают. Если Bin рендерим в App маршруте, то все работает.


  render () {
    return (
      <GlobalContext.Provider value={{
        state: this.state, 
        handleChange: () => this.handleChange, 
        handleClickAdd: () => this.handleClickAdd, 
        handleClickDel: (i) => this.handleClickDel(i), 
        handleClickSort: () => this.handleClickSort,
        handleClickReset: (i) => this.handleClickReset(i),
        handleClickClear: () => this.handleClickClear,
        componentDidMount: () => this.componentDidMount,
        hydrateStateWithLocalStorage: () => this.hydrateStateWithLocalStorage,
        }}>
          <div>
            <Cards
            />
            <Bin />
          </div>
      </GlobalContext.Provider>
    );
  }
}

export default App;