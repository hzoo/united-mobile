/** @jsx React.DOM */
var React = require('react/addons');

var ActionButton = React.createClass({
    render: function() {
        var className = 'ActionButton btn btn-lg btn-default';
        return (
            <button type={this.props.type} className={className}>
                <span>{this.props.text}</span>
            </button>
        );
    }
})

var InputBox = React.createClass({
    renderInput: function(){
        var className = 'form-control';
        var ph = this.props.placeholder;
        var phLower = ph.toLowerCase();
        return <input className={className} type={this.props.type || 'text'} placeholder={ph} required/>;
    },
    renderLabel: function(){
        var ph = this.props.placeholder;
        var phLower = ph.toLowerCase();
        return <label>{ph}</label>;
    },
    render: function() {
        var className = 'form-group col-xs-12 floating-label-form-group';
        return (
            <div className={className}>
                {this.renderLabel()}
                {this.renderInput()}
            </div>
        );
    }
})

var Login = React.createClass({
    handleSubmit: function() {
        if (history.pushState) {
            history.pushState(null, null, '#/home');
        }
        else {
            location.hash = '#/home';
        }
    },
    render: function() {
        return (
            <div>
                <div className='header'>
                    <div className='logo'></div>
                </div>
                <div className='brand'></div>
                <div className='row'>
                    <span className='text-center col-md-12'>Airline Tickets, Travel Deals and Flights</span>
                </div>
                <form role='form' onSubmit={this.handleSubmit}>
                    <div className='row'>
                        <InputBox autofocus placeholder='Username'/>
                    </div>
                    <div className='row'>
                        <InputBox placeholder='Password' type='password'/>
                    </div>
                    <ActionButton text='Login' type='submit'/>
                </form>
            </div>
        );
    }
});

var Home = React.createClass({
    render: function() {
        return (
            <div>
                <div className='row greeting'>
                    <span>Welcome back, Douglas</span>
                    <span className='f-right'>
                        <a href='#/login'>
                            <span className=''>Logout</span>
                        </a>
                    </span>
                </div>
                 <div className='row'>
                    <BoardingPass />
                </div>
            </div>
        );
    }
});

var BoardingPass = React.createClass({
    render: function() {
        return (
            <div className='panel panel-default'>
                <div className='panel-heading'>United 286 - E12345678</div>
                <div className='panel-body'>
                    <div className='name'>
                        <span className='row'>
                            Mr. Douglas Rayden
                        </span>
                    </div>

                    <span className='row'>
                        <div className='qr'></div>
                    </span>

                    <span className='row row-line'>
                        <div className='panel panel-default BoardingPass'>
                                <div className='panel-heading'>From</div>
                                <div className='panel-body'>SFO</div>
                        </div>
                        <div className='panel panel-default BoardingPass'>
                            <div className='panel-heading'>To</div>
                            <div className='panel-body'>JFK</div>
                        </div>
                        <div className='panel panel-default BoardingPass'>
                                <div className='panel-heading'>Group</div>
                                <div className='panel-body'>7</div>
                        </div>
                        <div className='panel panel-default BoardingPass'>
                            <div className='panel-heading'>Seat</div>
                            <div className='panel-body'>23B</div>
                        </div>
                    </span>

                    <span className='row row-line'>
                        <div className='panel panel-default BoardingPass'>
                                <div className='panel-heading'>Gate</div>
                                <div className='panel-body'>51a</div>
                        </div>
                        <div className='panel panel-default BoardingPass'>
                            <div className='panel-heading'>Terminal</div>
                            <div className='panel-body'>2</div>
                        </div>
                        <div className='panel panel-default BoardingPass'>
                                <div className='panel-heading'>Depart: 7:05am</div>
                                <div className='panel-body'>May 7, 2014</div>
                        </div>
                    </span>
                </div>
            </div>
        );
    }
});

var App = React.createClass({
    getInitialState: function() {
        return {
            currentPage: 'login'
        };
    },
    componentDidMount: function() {
      var router = Router({
        '/login': this.setState.bind(this, {currentPage: 'login'}),
        '/home': this.setState.bind(this, {currentPage: 'home'}),
      });
      router.init();
    },
    render: function() {
        var partial;
        if (this.state.currentPage === 'home') {
            partial = <Home />;
        } else if (this.state.currentPage === 'boarding') {
            partial = <BoardingPass />;
        } else {
            partial = <Login />;
        }
        return (
            partial
        );
    }
})

React.renderComponent(<App />, document.getElementById('form'));
