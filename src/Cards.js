import React, { Fragment } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { Checkbox } from '@material-ui/core';
import './Cards.css'
import { GlobalContext } from './index';
import { withStyles } from '@material-ui/core/styles';

var list = JSON.parse(localStorage.getItem('list'));

const checkBoxStyles = theme => ({
    root: {
      '&$checked': {
        color: '#00bcd4',
      },
    },
    checked: {},
   })

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

export default function Cards() {
    return (
        <GlobalContext.Consumer>
            {( context ) => (
                <Fragment>
                    <div id="carddivinput">
                        <input id="carddivinputinp" value={context.state.value} onChange={context.handleChange()} />                        
                        <Button onClick={context.handleClickAdd()}>
                            Добавить
                        </Button>
                        <Button onClick={context.handleClickSort()}>
                            Сортировать карточки по алфавиту
                        </Button>
                    </div>              
                    <div>
                        {context && context.state.list.map((value, i) => {
                            return (
                                <Card id="cardmain" key={i}>
                                    <div id="carddiv">
                                        <div>
                                            <CustomCheckbox /> 
                                        </div>                            
                                        <span id="carddivspan"> {value} </span>
                                    </div>
                                    <Button id="cardbutton" onClick={() => context.handleClickDel(i)}>
                                        <Icon>delete</Icon>
                                        Удалить                                
                                    </Button>                                        
                                </Card>                                       
                            );
                        })} 
                    </div>
                </Fragment>
            )}
        </GlobalContext.Consumer>
    );
  }