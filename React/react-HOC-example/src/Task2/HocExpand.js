import React from 'react';

export const withExpand = (WrappedComponent) => {
  class HOC extends React.Component {
    state = {
      expanded: true,
    };

    expand = () => {
      this.setState((state, props) => ({
        expanded: true
      }));
    }

    collapse = () => {
      this.setState((state, props) => ({
        repos: 2,
        expanded: false
      }));
    }


    render() {
      return (
        <div>
          <WrappedComponent
            expanded={this.state.expanded}
            reposToShow={this.state.repos}
            expand={this.expand}
            collapse={this.collapse}
            {...this.props} />
        </div>
      );
    }
  }

  return HOC;
}
