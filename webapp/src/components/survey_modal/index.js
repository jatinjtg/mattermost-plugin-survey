import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Actions from '../../actions';
import Selectors from '../../selectors';

import SurveyModal from './survey_modal';

const mapStateToProps = (state) => ({
    visible: Selectors.isSurveyModalVisible(state),
    surveyPostID: Selectors.currentPostID(state),
    surveyPostProps: Selectors.currentPostProps(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    close: Actions.closeSurveyModal,
    getSurvey: Actions.getSurvey,
    submitSurveyResponses: Actions.submitSurveyResponses,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SurveyModal);
