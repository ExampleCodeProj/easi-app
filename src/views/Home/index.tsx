import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { withAuth } from '@okta/okta-react';

import useAuth from 'hooks/useAuth';
import Header from 'components/Header';
import Button from 'components/shared/Button';
import ActionBanner from 'components/shared/ActionBanner';
import { AppState } from 'reducers/rootReducer';
import { fetchSystemIntakes } from 'types/routines';
import { SystemIntakeForm } from 'types/systemIntake';

type HomeProps = RouteComponentProps & {
  auth: any;
};

const Home = ({ auth, history }: HomeProps) => {
  const [isAuthenticated] = useAuth(auth);
  const dispatch = useDispatch();
  const systemIntakes = useSelector(
    (state: AppState) => state.systemIntakes.systemIntakes
  );
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchSystemIntakes());
    }
  }, [isAuthenticated]);

  const getSystemIntakeBanners = () => {
    return systemIntakes.map((intake: SystemIntakeForm) => {
      switch (intake.status) {
        case 'DRAFT':
          // TODO: When content sweep gets merged, this needs to be requestName
          return (
            <ActionBanner
              key={intake.id}
              title={
                intake.projectName
                  ? `${intake.projectName}: Intake Request`
                  : 'Intake Request'
              }
              helpfulText="Your Intake Request is incomplete, please submit it when you are ready so that we can move you to the next phase"
              onClick={() => {
                history.push(`/system/${intake.id}`);
              }}
              label="Go to Intake Request"
            />
          );
        default:
          return null;
      }
    });
  };

  return (
    <div>
      <Header />
      <div className="grid-container margin-top-6">
        {getSystemIntakeBanners()}
        <h1 className="margin-top-6">Welcome to EASi</h1>
        <p>
          You can use EASi to go through the set of steps needed for Lifecycle
          ID approval by the Governance Review Board (GRB).
        </p>

        {isAuthenticated ? (
          <Button
            type="button"
            onClick={() => {
              history.push('/system/new');
            }}
          >
            Start now
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() => {
              history.push('/login');
            }}
          >
            Sign in to start
          </Button>
        )}
      </div>
    </div>
  );
};

export default withRouter(withAuth(Home));
