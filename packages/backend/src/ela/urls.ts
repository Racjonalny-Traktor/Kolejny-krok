export const getLinkForFindingUniveristies = (education: string) =>
  `https://ela.nauka.gov.pl/sla-server/v6.0/major/filterList?experience=ALL&graduationYear=2021&institution=&studyVoivodeship=&studyForm=&studyLevel=&limit=10&offset=0&major=${education}&lang=pl`;

export const getLinkToGenerateInfoGraphics = (insitution: string) =>
  `https://ela.nauka.gov.pl/pl/infographics/graduates?graduationYear=2021&studyField=DZ00&studyLevel=FIRST&institution=${Math.round(
    parseInt(insitution, 10),
  )}`;
