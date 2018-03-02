import React from 'react'
import { connect } from 'react-redux';

function navigationAware(ScreenComponent, routeName: string) {

  const mapStateToProps = state => ({
    routeName: state.nav.routes[state.nav.routes.length - 1].routeName,
  });

  class NavigationAware extends React.Component {
    props: {
      routeName: string
    };

    screenWillFocus = (): boolean => (
      this.props.routeName === routeName
    );

    render() {
      return (
        <ScreenComponent
          {...this.props}
          routeName={this.props.routeName}
          screenWillFocus={this.screenWillFocus}
        />
      );
    }
  }

  return connect(mapStateToProps)(NavigationAware);
}

export default navigationAware