export default class App extends React.Component {
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

// ReactDOM.render(<App />, document.getElementById('app'));

ReactDOM.render((
  <Router>
    <Route path="/" component={MainLayout}>
        <Route path="home" component={Home} />
        <Route path="upload" component={Upload} />
        <Route path="carousel" component={Carousel} />
        <Route path="signup" component={SignUp} />
        <Route path="signin" component={SignIn} />
    </Route>
  </Router>
), document.getElementById('app'));




