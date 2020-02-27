import React from 'react';
import List from '@material-ui/core/List';
import { ListItem } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

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
                        return <ListItem key={'event' + i.toString()   }>
                            <Card style={{width: "80%"}}>
                            <CardHeader
                                title={event.title}
                                subheader={event.date}
                            />
                            <CardContent>
                                {event.desc}
                            </CardContent>
                            </Card>

                        </ListItem>
                        })}
                </List> 
            </div>
        );
  
    }
  }

export default CardList;