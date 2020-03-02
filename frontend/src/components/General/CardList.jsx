import React from 'react';
import List from '@material-ui/core/List';
import { ListItem } from '@material-ui/core';
import CustomCard from './CustomCard'

class CardList extends React.Component {
    constructor(props) {
      super(props);
      console.log("mounting card list");
    }

    render() {
     
        return (
            <div>
                <List>
                    {this.props.elementList.length > 0 && this.props.elementList.map((event, i) =>{
                        return <ListItem key={'event' + i.toString()}  >
                            <CustomCard  event={event} ></CustomCard>
                        </ListItem>
                        })}
                </List> 
            </div>
        );
        
    }
  }

export default CardList;