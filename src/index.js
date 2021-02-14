import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Loader from './Loader';

class App extends React.Component{

    state = {lat: null, errorMessage: ''};

    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({lat:position.coords.latitude}),
            err => this.setState({errorMessage: err.message})
        );
    }

    renderContent(){
        if(this.state.errorMessage && !this.state.lat)
        {
            return <div>Error: {this.state.errorMessage}</div>
        }

        if(!this.state.errorMessage && this.state.lat)
        {
            return <SeasonDisplay lat={this.state.lat}></SeasonDisplay>
        }
        return <Loader message="Please accept location request"></Loader>
    }

    render(){
        return (
        <div className="border red">
            {this.renderContent()}
        </div>
        );
        /*dont add conditionals inside render.. bcoz if we have a new requirement then we need to modify each and every condition.  Instead add a helper method*/
    }
}

ReactDOM.render(<App />, document.querySelector("#root"));