package controller

import (
	"encoding/json"
	"net/http"

	"github.com/pkg/errors"

	"github.com/Brightscout/mattermost-plugin-survey/server/config"
	"github.com/Brightscout/mattermost-plugin-survey/server/model"
	"github.com/Brightscout/mattermost-plugin-survey/server/platform"
)

var submitSurveyResponse = &Endpoint{
	Path:         "/submit",
	Method:       http.MethodPost,
	Execute:      executeSubmitSurveyResponse,
	RequiresAuth: true,
}

func executeSubmitSurveyResponse(w http.ResponseWriter, r *http.Request) error {
	surveyPostID := r.URL.Query().Get("survey_post_id")

	response := &model.SurveyResponse{}
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(response); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return errors.Wrap(err, "failed to decode request body into survey response object")
	}

	response.UserID = r.Header.Get(config.HeaderMattermostUserID)

	if err := platform.SubmitSurveyResponse(surveyPostID, response); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return err
	}

	if _, err := w.Write([]byte("ok")); err != nil {
		return errors.Wrap(err, "failed to write data to HTTP response")
	}

	return nil
}