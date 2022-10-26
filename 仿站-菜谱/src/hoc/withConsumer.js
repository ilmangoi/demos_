import React from "react";
import ctx from "@/context/appContext";
import _ from "lodash";

const withConsumer = (Cmp) => {
  class Container extends Cmp {
    render() {
      Cmp.contextType = ctx;
      let props = _.cloneDeep(this.props);
      return <Cmp {...props} />;
    }
  }
  return Container;
};

export default withConsumer;
