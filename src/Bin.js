import React, { Fragment } from 'react';
import Card from '@material-ui/core/Card';
import { Checkbox } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import './Cards.css';
import { GlobalContext } from '.';
import { withStyles } from '@material-ui/core/styles';


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
                        {context.state.binlist.map((card, i) => (
                                <Card id="cardmain" key={i}>
                                        <div id="carddiv">
                                            <CustomCheckbox checked={card.checked} onClick={context.handleCheck(card.checked)} />
                                            <span id="carddivspan"> {card.name} </span>
                                        </div>
                                        <span id="carddivspan"> {card.content} </span>
                                    <Button id="cardbutton" onClick={() => context.handleClickReset(i)}>
                                        <Icon>restore</Icon>
                                        Восстановить                                
                                    </Button>                                                            
                                </Card>                                       
                            
                            ))
                        }
                    </div>
                </Fragment>
            )}
        </GlobalContext.Consumer>
    );
}
