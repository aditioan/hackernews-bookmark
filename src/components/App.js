import React, { Component } from 'react';
import axios from 'axios';
import { sortBy } from 'lodash';
import classNames from 'classnames';
import Moment from 'react-moment';
import { addBookmark, deleteBookmark } from "../actions/index";
import store from "../store/index";
import './App.css';

const DEFAULT_USER = 'ytrash';

const SORTS = {
  NONE: list => list,
  ID: list => sortBy(list, 'id'),
  AUTHOR: list => sortBy(list, 'by'),
  TYPE: list => sortBy(list, 'type'),
  TIME: list => sortBy(list, 'time'),
  TITLE: list => sortBy(list, 'title'),
  TEXT: list => sortBy(list, 'text'),
  SCORE: list => sortBy(list, 'score'),
  URL: list => sortBy(list, 'url'),
};

class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      results: [],
      usernameSearch: DEFAULT_USER,
      username: DEFAULT_USER,
      totalBookmarks: 0,
      error: null,
      isLoading: false,
      sortKey: 'NONE',
      isSortReverse: false,
    };

    this.needsToGetUserData = this.needsToGetUserData.bind(this);
    this.setUserPost = this.setUserPost.bind(this);
    this.fetchUserData = this.fetchUserData.bind(this);
    this.fetchUserPost = this.fetchUserPost.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.addBookmark = this.addBookmark.bind(this);
    this.deleteBookmark = this.deleteBookmark.bind(this);
  }

  needsToGetUserData(username) {
    return this.state.usernameSearch !== username;
  }

  setUserPost(result) {
    const { submitted } = result;
    submitted.map((postID) =>
        this.fetchUserPost(postID)
      );
  }

  fetchUserData(username) {
    this.setState({ isLoading: true });
    this.setState({ results: [] });

    axios(`https://hacker-news.firebaseio.com/v0/user/${username}.json`)
      .then(result => this.setUserPost(result.data))
      .catch(error => this._isMounted && this.setState({ error }));
  }

  fetchUserPost(postID) {
    this.setState({ isLoading: true });
    this.setState({ error: null });

    axios(`https://hacker-news.firebaseio.com/v0/item/${postID}.json`)
      .then(result => {
        if (result.data.deleted === undefined) {
          this.setState({results: this.state.results.concat(result.data), isLoading: false})
        }
      })
      .catch(error => this._isMounted && this.setState({ error }));
  }

  countBookmarks(data) {
    this.setState({ totalBookmarks: data.bookmarkLists.length });
  }

  componentDidMount() {
    this._isMounted = true;

    const { username } = this.state;
    this.countBookmarks(store.getState());
    this.fetchUserData(username);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onSearchChange(event) {
    this.setState({ username: event.target.value });
  }

  onSearchSubmit(event) {
    const { username } = this.state;

    if (this.needsToGetUserData(username)) {
      this.setState({ usernameSearch: username });
      this.fetchUserData(username);
    }

    event.preventDefault();
  }

  addBookmark(post) {
    let currentData = store.getState();
    let duplicate = currentData.bookmarkLists.filter((item) => {
      return item.id === post.id;
    });
    if (duplicate.length > 0) {
      alert('This data has already been added in Bookmark list!');
    } else {
      store.dispatch(addBookmark(post));
      this.setState({ totalBookmarks: this.state.totalBookmarks + 1 });
    }
  }

  deleteBookmark(bookmark) {
    if (window.confirm("Are you sure to delete this data?")) {
      store.dispatch(deleteBookmark(bookmark));
      this.setState({ totalBookmarks: this.state.totalBookmarks - 1 });
    }
  }

  backToTop() {
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  render() {
    const {
      username,
      results,
      totalBookmarks,
      error,
      isLoading
    } = this.state;
    let list = results || [];

    return (
      <div className="page">
        <h1><span className="header-title">HackerNews Bookmark</span> <span className="right-header">{totalBookmarks} Bookmarks</span></h1>
        <BookmarkLists
            deleteBookmark={this.deleteBookmark}></BookmarkLists>
        <div className="interactions">
          <h2><u>User Posts</u></h2>
        </div>
        <div className="interactions">
          <Submit
            value={username}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Submit
          </Submit>
        </div>
        { error
          ? <div className="interactions">
            <p>Something went wrong !</p>
          </div>
          : <Table
            list={list}
            addBookmark={this.addBookmark}
          />
        }
        <div className="interactions">
          <ButtonWithLoading
            isLoading={isLoading}
            onClick={this.backToTop}>
            Back to Top
          </ButtonWithLoading>
          <br />
          <br />
          <span>&copy; 2018 <a href="https://www.linkedin.com/in/aditio-agung-nugroho-9805297b/">Aditio Agung Nugroho</a></span>
        </div>
      </div>
    );
  }
}

const Submit = ({
  value,
  onChange,
  onSubmit,
  children
}) =>
  <form onSubmit={onSubmit}>
    Input HackerNews Username : 
    <input
      type="text"
      placeholder="HackerNews username"
      value={value}
      onChange={onChange}
    />
    <button type="submit">
      {children}
    </button>
  </form>

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: 'TITLE',
      isSortReverse: false,
    };

    this.onSort = this.onSort.bind(this);
  }

  onSort(sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  }

  render() {
    const {
      list,
      addBookmark
    } = this.props;

    const {
      sortKey,
      isSortReverse,
    } = this.state;

    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse
      ? sortedList.reverse()
      : sortedList;

    return (
      <div className="table">
        <div className="table-header">
          <span style={{ width: '5%' }}>
            <Sort
              sortKey={'ID'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              <strong>ID</strong>
            </Sort>
          </span>
          <span style={{ width: '5%' }}>
            <Sort
              sortKey={'TYPE'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              <strong>Type</strong>
            </Sort>
          </span>
          <span style={{ width: '10%' }}>
            <Sort
              sortKey={'TIME'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              <strong>Time</strong>
            </Sort>
          </span>
          <span style={{ width: '18%' }}>
            <Sort
              sortKey={'TITLE'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              <strong>Title</strong>
            </Sort>
          </span>
          <span style={{ width: '25%' }}>
            <Sort
              sortKey={'TEXT'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              <strong>Text</strong>
            </Sort>
          </span>
          <span style={{ width: '5%' }}>
            <Sort
              sortKey={'SCORE'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              <strong>Score</strong>
            </Sort>
          </span>
          <span style={{ width: '25%' }}>
            <Sort
              sortKey={'URL'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              <strong>URL</strong>
            </Sort>
          </span>
          <span style={{ width: '7%' }}>
            <strong>Bookmarks</strong>
          </span>
        </div>
        {reverseSortedList.map(item =>
          <div key={item.id} className="table-row">
            <span style={{ width: '5%' }}>
              {item.id}
            </span>
            <span style={{ width: '5%' }}>
              {item.type}
            </span>
            <span style={{ width: '10%' }}>
              <Moment unix>{item.time}</Moment>
            </span>
            <span style={{ width: '18%' }}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={{ width: '25%' }}>
              {item.text}
            </span>
            <span style={{ width: '5%' }}>
              {item.score}
            </span>
            <span style={{ width: '25%' }}>
              {item.url}
            </span>
            <span style={{ width: '7%' }}>
              <Button
                className="button-info"
                onClick={() => addBookmark(item)}>
                Add
              </Button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

class BookmarkLists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: 'TITLE',
      isSortReverse: false,
    };

    this.onSort = this.onSort.bind(this);
  }

  onSort(sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  }

  render() {
    const {
      deleteBookmark
    } = this.props;

    const {
      sortKey,
      isSortReverse,
    } = this.state;

    let list = store.getState();
    const sortedList = SORTS[sortKey](list.bookmarkLists);
    const reverseSortedList = isSortReverse
      ? sortedList.reverse()
      : sortedList;

    return (
      <div className="table">
        <div className="table-header">
          <span style={{ width: '10%' }}>
            <Sort
              sortKey={'ID'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              <strong>ID</strong>
            </Sort>
          </span>
          <span style={{ width: '10%' }}>
            <Sort
              sortKey={'TYPE'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              <strong>Type</strong>
            </Sort>
          </span>
          <span style={{ width: '30%' }}>
            <Sort
              sortKey={'TITLE'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              <strong>Title</strong>
            </Sort>
          </span>
          <span style={{ width: '10%' }}>
            <Sort
              sortKey={'AUTHOR'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              <strong>AUTHOR</strong>
            </Sort>
          </span>
          <span style={{ width: '35%' }}>
            <Sort
              sortKey={'URL'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              <strong>URL</strong>
            </Sort>
          </span>
          <span style={{ width: '5%' }}>
            <strong>ACTION</strong>
          </span>
        </div>
        {reverseSortedList.map(item =>
          <div key={item.id} className="table-row">
            <span style={{ width: '10%' }}>
              {item.id}
            </span>
            <span style={{ width: '10%' }}>
              {item.type}
            </span>
            <span style={{ width: '30%' }}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={{ width: '10%' }}>
              {item.by}
            </span>
            <span style={{ width: '35%' }}>
              {item.url}
            </span>
            <span style={{ width: '5%' }}>
              <Button
                className="button-danger"
                onClick={() => deleteBookmark(item)}
              >
                Delete
              </Button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

const Sort = ({
  sortKey,
  activeSortKey,
  onSort,
  children
}) => {
  const sortClass = classNames(
    'button-inline',
    { 'button-active': sortKey === activeSortKey }
  );

  return (
    <Button
      onClick={() => onSort(sortKey)}
      className={sortClass}
    >
      {children}
    </Button>
  );
}

const Button = ({
  onClick,
  className = '',
  children,
}) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>

const Loading = () =>
  <div>Loading ...</div>

const withLoading = (Component) => ({ isLoading, ...rest }) =>
  isLoading
    ? <Loading />
    : <Component { ...rest } />

const ButtonWithLoading = withLoading(Button);

export {
  Button,
  Submit,
  Table,
};

export default App;