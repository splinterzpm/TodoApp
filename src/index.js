import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Cards from './Cards';
import Bin from './Bin';
import EditCard from './EditCard';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import * as serviceWorker from './serviceWorker';

export const GlobalContext = React.createContext();

class App extends Component {
  state = {
    list: [
      { name: 'Дело 1', content: 'Содержимое 1', checked: false, tags: [{ id: 'Расписание', text: 'Расписание'}, { id: 'Дела', text: 'Дела'}]},
      { name: 'Дело 2', content: 'Содержимое 2', checked: false, tags: [{ id: 'Расписание', text: 'Расписание'}, { id: 'Дела', text: 'Дела'}]}, 
      { name: 'Дело 3', content: 'Содержимое 3', checked: false, tags: [{ id: 'Расписание', text: 'Расписание'}, { id: 'Дела', text: 'Дела'}]}
    ],
    value: '',
    value2: '',
    tagvalue:'',
    binlist: [],
    isEdit: false,
    isConfirmed: false,
    editedCard: '',
    editedCardName: '',
    editedCardContent: '',
    input: React.createRef(),
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

  saveStateToLocalStorage() {
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  componentDidMount () {
    this.hydrateStateWithLocalStorage();
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  handleChange = ({ target: { value }}) => {
    this.setState({ value: value });
  }
  
  handleChangeV2 = ({ target: { value }}) => {
    this.setState({ value2: value });
  }

  handleClickAdd = () => {
    const newlist = this.state.list;
    newlist.push({ name: this.state.value, content: this.state.value2, checked: false, tags:[] });
    this.setState({ list: newlist, value: '', value2: '' });
  }

  handleClickDel = (i) => {
    const newbinlist = this.state.binlist;
    const newlist = this.state.list;
    newbinlist.push(newlist[i]);
    newlist.splice(i, 1);
    this.setState({ list: newlist, binlist: newbinlist});
  }

  handleClickSort = () => {
    const newlist = this.state.list;
    newlist.sort((a, b) => (a.name > b.name) ? 1 : -1);
    this.setState({ list: newlist});
  }

  handleClickReset = (i) => {
    const newbinlist = this.state.binlist;
    const newlist = this.state.list;
    newlist.push(newbinlist[i]);
    newbinlist.splice(i, 1);
    this.setState({ list: newlist, binlist: newbinlist});
  }

  handleClickClear = () => {
    const newBin = [];
    this.setState({ list: [
      { name: 'Дело 1', content: 'Содержимое 1', checked: false, tags: [{ id: 'Расписание', text: 'Расписание'}, { id: 'Дела', text: 'Дела'}]},
      { name: 'Дело 2', content: 'Содержимое 2', checked: false, tags: [{ id: 'Расписание', text: 'Расписание'}, { id: 'Дела', text: 'Дела'}]}, 
      { name: 'Дело 3', content: 'Содержимое 3', checked: false, tags: [{ id: 'Расписание', text: 'Расписание'}, { id: 'Дела', text: 'Дела'}]}
    ],binlist: newBin });
  }

  CleanBinTimer = () => {
    setInterval(this.handleClickClear, 3000);
  }

  handleClickEdit = (i) => {
    this.setState({ editedCard: i, editedCardName: this.state.list[i].name, editedCardContent: this.state.list[i].content, isEdit: true, isConfirmed: false });
    const newList = this.state.list;
    delete newList[i].name;
    delete newList[i].content;
    this.setState({ list: newList });
  }

  handleChangeCardName = ({ target: { value }}) => {
    this.setState({ editedCardName: value });
  }

  handleChangeCardContent = ({ target: { value }}) => {
    this.setState({ editedCardContent: value });
  }

  handleClickConfirm = (i) => {
    const newList = this.state.list;
    newList[i].name = this.state.editedCardName;
    newList[i].content = this.state.editedCardContent;
    this.setState({ list: newList, isEdit: false, isConfirmed: true, editedCard: '', editedCardName: '', editedCardContent: ''  });
  }

  handleCheck = (i) => {
    const newlist = this.state.list;
    newlist[i] = !newlist[i];
    console.log(newlist[i]);
  }

  handleInputChange = ({ target: { value }}) => {
    this.setState({ tagvalue: value });
  }

  handleAddition = (i) => {
    var stateCopy = Object.assign({}, this.state);
    stateCopy.list = stateCopy.list.slice();
    stateCopy.list[i] = Object.assign({}, stateCopy.list[i]);
    stateCopy.list[i].tags = stateCopy.list[i].tags.slice();
    stateCopy.list[i].tags = [...stateCopy.list[i].tags, { id: this.state.tagvalue, text: this.state.tagvalue }]
    this.setState(stateCopy);
  }
  
  handleDelete = (i) => {
    const newtags = this.state.list;
    newtags[i].tags.splice(i, 1);
  }

  render () {
    return (
      <GlobalContext.Provider value={{
        state: this.state, 
        handleChange: () => this.handleChange,
        handleChangeV2: () => this.handleChangeV2,
        handleClickAdd: () => this.handleClickAdd, 
        handleClickDel: (i) => this.handleClickDel(i), 
        handleClickSort: () => this.handleClickSort,
        handleClickReset: (i) => this.handleClickReset(i),
        handleClickClear: () => this.handleClickClear,
        handleClickEdit: (i) => this.handleClickEdit(i),
        handleChangeCardName: () => this.handleChangeCardName,
        handleChangeCardContent: () => this.handleChangeCardContent,
        handleClickConfirm: (i) => this.handleClickConfirm(i),
        handleCheck: (i) => this.handleCheck(i),
        handleAddition: (i) => this.handleAddition,
        handleDelete: () => this.handleDelete,
        handleInputChange: () => this.handleInputChange,
        CleanBinTimer: () => this.CleanBinTimer,
        componentDidMount: () => this.componentDidMount,
        hydrateStateWithLocalStorage: () => this.hydrateStateWithLocalStorage,
        
        }}>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/Bin">Bin</Link>
              </li>
            </ul>
            <Switch>
              <Route exact path="/" render={() => (
                <div>
                  {(this.state.isEdit === true && this.state.isConfirmed === false) ? <div> <Cards /> <EditCard /> </div> : <Cards />}
                </div>
              )} />
              <Route path="/Bin" component={Bin} />
              <Route component={NotFound} />
            </Switch>
          </div>
          </Router>
      </GlobalContext.Provider>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
export default App;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();