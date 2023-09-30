import { Occupation, Root } from "../types/occupation";


export const mapOccupationToKnownFormat = (data: Root): Occupation => {
    const { basics, descriptions, similar, skills, statistics, building } = data.pageProps.occupation;

    return ({
        id: basics.id,
        name: basics.name,
        fullName: basics.full_name,
        description: basics.description,

        shortDescription: descriptions.descriptionShort,
        jobDescription: descriptions.description,

        professionalStream: basics.professionalStream?.title ?? '',
        industryName: basics.group_name?.toString() ?? '',

        futureJob: Boolean(basics.future_job),
        employers: Boolean(basics.employers),
        regulated: {
        isRegulated: Boolean(basics.regulated.value),
        description: Boolean(basics.regulated.value) ? basics.regulated.description : '',
        },
        
        skills: skills.map((skill) => ({
            skillId: skill.id,
            name: skill.name,
            description: skill.description,
            source: skill.source,
        })),

        simillarOccupations: similar.map((item) => ({
            occupationId: item.occupationID,
            name: item.name,
            alias: item.alias,
            futureJob: Boolean(item.futureJob),
            regulated: Boolean(item.regulated),
        })),

        building: {
            id: building.id,
            buildingName: building.name,
        },

        statistics: {
            market: {
                size: statistics.market.value,
            },
            salary: {
                size: statistics.salary.value,
            },
        },
    })
};