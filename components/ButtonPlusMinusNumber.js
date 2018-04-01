import React from 'react';
import { Button, Segment, Icon } from 'semantic-ui-react';


class SearchResultsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }
  
  componentWillReceiveProps(nextProps) {
    return this.setState({ value: nextProps.value });
  }
  
  render() {
    const { value } = this.state;
    return (
      <div>
        <div style={{ textAlign: 'center', width: '100%' }}>{this.props.title}</div>
        <Button.Group>
          {/*language=CSS*/}
          <style jsx global>
            {`
                .custom-segment {
                    box-shadow: none !important;
                    margin: 0 !important;
                    border-radius: 0 !important;
                    border-width: 1px 0 !important;
                }
            `}
          </style>
          <Button
            onClick={this.props.clickMinus.bind(this, this.state.value)}
            icon
          ><Icon name='minus' /></Button>
          <Segment className='custom-segment'>{value}</Segment>
          <Button
            onClick={this.props.clickPlus.bind(this, this.state.value)}
            icon
          ><Icon name='plus' /></Button>
        </Button.Group>
      </div>
    );
  }
  
}

export default SearchResultsList;