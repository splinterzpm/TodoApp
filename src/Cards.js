import React, { Fragment } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { Checkbox } from '@material-ui/core';
import './Cards.css'
import { GlobalContext } from '.';
import { withStyles } from '@material-ui/core/styles';
import { WithContext as ReactTags } from 'react-tag-input';

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
                    <div>
                        <div id="carddivinput">
                            <p> Название карточки </p>      
                            <input id="carddivinputinp" value={context.state.value} 
                            onChange={context.handleChange()} />
                            <p> Содержимое карточки </p>  
                            <input id="carddivinputinp" value={context.state.value2} 
                            onChange={context.handleChangeV2()} />
                        </div>
                        <Button onClick={context.handleClickAdd()}>
                            Добавить
                        </Button>
                        <Button onClick={context.handleClickSort()}>
                            Сортировать карточки по алфавиту
                        </Button>

                    </div>              
                    <div>
                        {context && context.state.list.map((card, i) => (
                                <Card id="cardmain" key={i}>
                                    <div id="carddiv">
                                        <label>
                                            {console.log(card.tags)}
                                        <CustomCheckbox defaultChecked={context.state.list[i].checked}  /> 
                                        </label>
                                        <span id="carddivspan"> {card.name} </span>                                            
                                    </div>
                                    <span id="carddivspan"> {card.content} </span>
                                    <Button id="cardbutton" onClick={() => context.handleClickEdit(i)}>
                                        <Icon>edit</Icon>
                                        Редактировать                                
                                    </Button>
                                    <Button id="cardbutton" onClick={() => context.handleClickDel(i)}>
                                        <Icon>delete</Icon>
                                        Удалить                                
                                    </Button>
                                    <ReactTags tags={card.tags}
                                    handleInputChange={context.handleInputChange}
                                    autofocus={false} 
                                    handleAddition={context.handleAddition(i)}
                                    handleDelete={context.handleDelete(i)}
                                    />                            
                                </Card>
                              )
                            )
                        }
                        {/* {context && context.state.list.map((value, i) => {
                            return (
                                <Card id="cardmain" key={i}>
                                    <div id="carddiv">
                                        <CustomCheckbox />                           
                                        <span id="carddivspan"> {value} </span>
                                        <span id="carddivspan"> {context.state.textlist[i]} </span>
                                    </div>
                                    <Button onClick={() => context.handleClickEdit(i)}>
                                        <Icon>edit</Icon>
                                        Редактировать                                
                                    </Button>
                                    <Button id="cardbutton" onClick={() => context.handleClickDel(i)}>
                                        <Icon>delete</Icon>
                                        Удалить                                
                                    </Button>                              
                                </Card>                                       
                            );
                        })}  */}
                    </div>
                </Fragment>
            )}
        </GlobalContext.Consumer>
    );
  }