import { OccupationCSVFriendly, Root as OccupationDTO, Subject } from '../types/occupation';

type SubjectValues = Pick<
OccupationCSVFriendly,
| 'math'
| 'art'
| 'biology'
| 'physics'
| 'technics'
| 'polish'
| 'english'
| 'geography'
| 'history'
| 'wos'
| 'chemistry'
| 'informatics'
| 'art'
| 'music'
>;

export const mapOccupationToKnownFormat = (data: OccupationDTO): OccupationCSVFriendly => {
  const { basics, descriptions, similar, skills, statistics, subjects, education } = data.pageProps.occupation;

  const subjectSlugs = subjects.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.slug]:  curr.level.value
    };
  }, {}) as SubjectValues;

  const higherEducation: string[] = [];

  education.forEach(({ schools }) => {
    schools.forEach(({ schoolType, schoolName }) => {
      if (schoolType.includes('Studia')) {
        higherEducation.push(schoolName);
      }
    });
  });

  const higherEducationWithoutDuplicates = [...new Set(higherEducation)];

  return {
    id: basics.id,
    name: basics.name,
    fullName: basics.full_name,
    description: basics.description,

    shortDescription: descriptions.descriptionShort,
    jobDescription: descriptions.description,

    futureJob: Boolean(basics.future_job),
    employers: Boolean(basics.employers),

    isRegulated: Boolean(basics.regulated.value),
    regulationDescription:
      Boolean(basics.regulated.value) && basics.regulated.description?.length ? basics.regulated.description : null,

    skills: skills.map((skill) => skill.name).join(';') ?? null,
    simillarOccupations: similar.map((item) => item.occupationID).join(';') ?? null,

    marketSize: statistics?.market?.value ?? null,
    salary: statistics?.salary?.value ?? null,

    education: higherEducationWithoutDuplicates.join(';'),
    ...subjectSlugs,
  };
};
