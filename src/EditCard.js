import React, { Fragment } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { Checkbox } from '@material-ui/core';
import './Cards.css'
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

export default function EditCard () {
        return (
            <GlobalContext.Consumer>
                {( context ) => (
                    <Fragment>         
                        <div>
                            <Card id="cardmain" key={context.state.editedCard}>
                                <div id="carddiv">
                                    <CustomCheckbox />
                                    <input id="carddivinputinp" autoFocus={true} value={context.state.editedValue}
                                    onChange={context.handleChangeOnCard()} />
                                </div>
                                <Button onClick={() => context.handleClickConfirm(context.state.editedCard)}>
                                    <Icon>check</Icon>
                                    Подтвердить                 
                                </Button>                            
                            </Card>
                        </div>
                    </Fragment>
                )}
            </GlobalContext.Consumer>
        );
    }