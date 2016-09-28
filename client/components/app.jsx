class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //
    };
  }
  // tick() {
  //   this.setState({count: this.state.count + 1});
  // }
  render() {
    // return (
    //   <div onClick={this.tick}>
    //     Clicks: {this.state.count}
    //   </div>
    // );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));