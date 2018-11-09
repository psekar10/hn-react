import React, { Component } from 'react';
import './App.css';

const StoryTile = (props) => {
  return(
    <div className="Card">
      <a href={props.url} title={props.title} target="_blank">
        <div className="Title">{props.title}</div>
        <div className="Url">{props.url}</div>
      </a>
      <div>
        <span>{props.points} points by <span className="By">{props.by}</span>  {props.time} mins ago</span>
      </div>
    </div>
  )
}
class Story extends Component {
  initStory = (info) => {
    let curTime = Date.now()/1000;
    let delayMin = Math.round((curTime - info.time) / (60));
    this.setState({
      url : info.url,
      title : info.title,
      by : info.by,
      points : info.score,
      time : delayMin
    });
  };
  componentDidMount() {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${this.props.storyid}.json`)
    .then(res => res.json())
    .then(text => this.initStory(text))
    .catch((err) => console.log(err));
  }
  render() {
    return(
      <StoryTile
        {...this.state}
      />
    )
  }
}

class StoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories : []
    }
  }
  initStories = (storylist) => {
    console.log(storylist)
    this.setState({
      stories : storylist
    });
  };
  componentDidMount() {
    fetch(`https://hacker-news.firebaseio.com/v0/${this.props.title}.json`)
    .then(res => res.json())
    .then(text => this.initStories(text))
    .catch((err) => console.log(err));
  }
  render() {
    return(
        <div>
          {this.state.stories.map(story => <Story key={story.id} storyid={story}/>)}
        </div>
    )
  }
};

class Button extends Component {
  handleClick = () => {
    this.props.onClickFunction(this.props.value);
  }
  render() {
    return(
        <button onClick={this.handleClick}> {this.props.name}</button>
    );
  }
};


class App extends Component {
  state = { title: "topstories" }
  setTitle = (newTitle) => {
    this.setState({
      title : newTitle
    });
    console.log(this.state);
  };
  render() {
    return (
      <div>
          <Button onClickFunction={this.setTitle} name="top" value="topstories"/>
          <Button onClickFunction={this.setTitle} name="new" value="newstories"/>
          <Button onClickFunction={this.setTitle} name="beststories" value="beststories"/>
          <StoryList title={this.state.title}/>
      </div>
    );
  }
}

export default App;
