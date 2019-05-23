import React, { Fragment } from 'react';
import Card from '@material-ui/core/Card';
import { Checkbox } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import './Cards.css';
import { GlobalContext } from './index';
import { withStyles } from '@material-ui/core/styles';

var binlist = JSON.parse(localStorage.getItem('binlist'));

const checkBoxStyles = theme => ({
    root: {
      '&$checked': {
        color: '#00bcd4',
      },
    },
    checked: {},
   })

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

export default function Bin () {
    return (
            <GlobalContext.Consumer>
                { (context) => (
                    <Fragment>
                        <div id="carddivinput">                
                            <Button onClick={context.handleClickClear()}>
                                Очистить корзину
                            </Button>
                        </div>
                        <div>
                            {context && context.state.binlist.map((value, i) => {
                                return (
                                    <Card id="cardmain" key={i}>
                                        <div id="carddiv">
                                            <div>
                                                <CustomCheckbox />
                                            </div>                            
                                            <span id="carddivspan"> {value} </span>
                                        </div>
                                        <Button id="cardbutton" onClick={() => context.handleClickReset(i)}>
                                            <Icon>restore</Icon>
                                            Восстановить                                
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
