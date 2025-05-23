import { ResourceType } from '@medplum/fhirtypes';
import { Document, ResourceBlame, useMedplum } from '@medplum/react';
import { JSX } from 'react';
import { useParams } from 'react-router';

export function BlamePage(): JSX.Element | null {
  const medplum = useMedplum();
  const { resourceType, id } = useParams() as { resourceType: ResourceType; id: string };
  const history = medplum.readHistory(resourceType, id).read();

  return (
    <Document>
      <ResourceBlame history={history} />
    </Document>
  );
}
