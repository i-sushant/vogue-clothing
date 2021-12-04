import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectorIsFetching } from "../../redux/shop/shop.selectors";
import CollectionOverview from "./collection-overview.component";
import WithSpinner from "../with-spinner/with-spinner.component";
import { compose } from "redux";
const mapStateToProps = createStructuredSelector({
  isLoading: selectorIsFetching
});

const CollectionOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionOverview);

export default CollectionOverviewContainer;
