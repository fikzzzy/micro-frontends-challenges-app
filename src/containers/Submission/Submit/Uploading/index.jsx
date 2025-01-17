import React from "react";
import PT from "prop-types";
import { Link } from "@reach/router";
import { PrimaryButton, DefaultButton as Button } from "components/Buttons";
import { COMPETITION_TRACKS, CHALLENGES_URL } from "../../../../constants";
import RobotHappy from "assets/icons/robot-happy.svg";
import RobotSad from "assets/icons/robot-embarassed.svg";

import "./styles.scss";

const Uploading = ({
  challengeId,
  challengeName,
  error,
  isSubmitting,
  submitDone,
  reset,
  retry,
  track,
  uploadProgress,
  back,
}) => {
  return (
    <div styleName="container">
      <div styleName="uploading">
        {isSubmitting && <h3>UPLOADING SUBMISSION FOR</h3>}
        {submitDone && <h3>SUBMISSION COMPLETED FOR</h3>}
        {error && <h3>ERROR SUBMITTING FOR</h3>}

        {isSubmitting && <h3>&ldquo;{challengeName}&rdquo;</h3>}
        {(submitDone || error) && (
          <Link styleName="link" to={`${CHALLENGES_URL}/${challengeId}`}>
            {challengeName}
          </Link>
        )}

        {(isSubmitting || submitDone) && <RobotHappy />}
        {error && <RobotSad />}

        {isSubmitting && (
          <p>
            Hey, your work is AWESOME! Please don&#39;t close this window while
            I&#39;m working, you&#39;ll lose all files!
          </p>
        )}
        {isSubmitting && !submitDone && (
          <div styleName="progress-container">
            <div
              styleName="progress-bar"
              style={{ width: `${(100 * uploadProgress).toFixed()}%` }}
            />
          </div>
        )}

        {isSubmitting && !submitDone && (
          <p styleName="submitting">
            Uploaded: {(100 * uploadProgress).toFixed()}%
          </p>
        )}
        {error && (
          <p>
            Oh, that’s embarrassing! The file couldn’t be uploaded, I’m so
            sorry.
          </p>
        )}

        {error && <div styleName="error-msg">{error}</div>}
        {error && (
          <div styleName="button-container">
            <Button onClick={() => reset()}>Cancel</Button>
            <PrimaryButton onClick={() => retry()}>Try Again</PrimaryButton>
          </div>
        )}
        {submitDone && !error && (
          <p>
            Thanks for participating! We’ve received your submission and will
            send you an email shortly to confirm and explain what happens next.
          </p>
        )}
        {submitDone && !error && (
          <div styleName="button-container">
            {track === COMPETITION_TRACKS.DES ? (
              <span>
                <Button onClick={() => reset()}>Add Another Submission</Button>
                <PrimaryButton
                  to={`${CHALLENGES_URL}/${challengeId}/my-submissions`}
                  onClick={() => back()}
                >
                  View My Submissions
                </PrimaryButton>
              </span>
            ) : (
              <span>
                <Button onClick={() => reset()}>Submit Again</Button>
                <PrimaryButton
                  to={`${CHALLENGES_URL}/${challengeId}`}
                  onClick={() => back()}
                >
                  Back to Challenge
                </PrimaryButton>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Uploading.defaultProps = {};

Uploading.propTypes = {
  challengeId: PT.string,
  challengeName: PT.string,
  error: PT.string,
  isSubmitting: PT.bool,
  submitDone: PT.string,
  reset: PT.func,
  retry: PT.func,
  track: PT.string,
  uploadProgress: PT.number,
  back: PT.func,
};

export default Uploading;
