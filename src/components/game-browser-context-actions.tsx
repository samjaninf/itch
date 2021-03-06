
import * as React from "react";
import * as classNames from "classnames";
import {connect, I18nProps} from "./connect";

import {map} from "underscore";

import listSecondaryActions from "./game-actions/list-secondary-actions";
import {IActionsInfo} from "./game-actions/types";
import * as actions from "../actions";

import {IDispatch} from "../constants/action-types";

import GameBrowserContextAction from "./game-browser-context-action";

import watching, {Watcher} from "./watching";

const GENEROSITY_PREWARM = 500;
const GENEROSITY_TIMEOUT = 1000;
import delay from "../reactors/delay";

/**
 * Displays install, share, buy now buttons and so on.
 */
@watching
class GameBrowserContextActions extends React.Component<IProps & IDerivedProps & I18nProps, IState> {
  constructor () {
    super();
    this.state = {
      encouragingGenerosity: false,
    };
  }

  subscribe (watcher: Watcher) {
    watcher.on(actions.encourageGenerosity, async (store, action) => {
      const {level} = action.payload;

      if (level === "discreet") {
        await delay(GENEROSITY_PREWARM);
        this.setState({encouragingGenerosity: true});
        await delay(GENEROSITY_TIMEOUT);
        this.setState({encouragingGenerosity: false});
      }
    });
  }

  render () {
    const {items, error} = listSecondaryActions(this.props);

    return <div className={classNames("cave-actions", {
      error,
      ["encouraging-generosity"]: this.state.encouragingGenerosity,
    })}>
      {map(items, (opts, i) => {
        const key = `${opts.type}-${opts.icon}-${opts.label}`;
        return <GameBrowserContextAction opts={opts} key={key}/>;
      })}
    </div>;
  }
}

interface IProps extends IActionsInfo {}

interface IDerivedProps {
  dispatch: IDispatch;
}

interface IState {
  encouragingGenerosity: boolean;
}

export default connect<IProps>(GameBrowserContextActions, {
  dispatch: (dispatch) => ({dispatch}),
});
