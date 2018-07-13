import React,{Component,Input} from 'react';
import PropTypes from 'prop-types'

export default class Refresh extends Component {
  constructor(props) {
        super(props);
        this.state = {refresh:true};
      }

  componentDidMount(){
    const { onRefresh } = this.props
    this.timer = setInterval(()=>{
        this.setState({refresh:!this.state.refresh})
        onRefresh(this.state)
    },15000);
  }

  componentWillUnmount (){
    try{
        window.clearInterval(this.timer);
    }catch(e){
      console.log(e);
    }
  }

  render () {
    return (
      <div></div>
    )
  }
}

Refresh.propTypes = {
  onRefresh: PropTypes.func.isRequired,
}
