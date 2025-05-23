import { showNotification } from '@mantine/notifications';
import { normalizeErrorString } from '@medplum/core';
import { Questionnaire } from '@medplum/fhirtypes';
import { Document, QuestionnaireBuilder, useMedplum, useMedplumProfile, useResource } from '@medplum/react';
import { IconCircleCheck, IconCircleOff } from '@tabler/icons-react';
import { JSX, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Loading } from '../components/Loading';

export function QuestionnaireCustomizationPage(): JSX.Element {
  const navigate = useNavigate();
  const medplum = useMedplum();
  const profile = useMedplumProfile();
  const { questionnaireId } = useParams();

  const questionnaire = useResource<Questionnaire>({ reference: `Questionnaire/${questionnaireId}` });

  const handleOnSubmit = useCallback(
    (response: Questionnaire) => {
      if (!questionnaire || !profile) {
        return;
      }

      medplum
        .updateResource<Questionnaire>({
          ...response,
          version: new Date().toISOString(),
        })
        .then(() => {
          showNotification({
            icon: <IconCircleCheck />,
            title: 'Success',
            message: 'Answers recorded',
          });
          navigate(`/`)?.catch(console.error);
          window.scrollTo(0, 0);
        })
        .catch((err) => {
          showNotification({
            color: 'red',
            icon: <IconCircleOff />,
            title: 'Error',
            message: normalizeErrorString(err),
          });
        });
    },
    [medplum, navigate, questionnaire, profile]
  );

  if (!questionnaire) {
    return <Loading />;
  }

  return (
    <Document width={800}>
      <QuestionnaireBuilder questionnaire={questionnaire} onSubmit={handleOnSubmit} />
    </Document>
  );
}
