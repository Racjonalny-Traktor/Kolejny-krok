export interface Root {
    pageProps: PageProps
    __N_SSG: boolean
  }
  
  export interface PageProps {
    occupation: Occupation
    webmetadata: Webmetadata
  }
  
  export interface Occupation {
    group: Group
    basics: Basics
    skills: Skill[]
    similar: Similar[]
    building: Building
    subjects: Subject[]
    education: Education[]
    statistics: Statistics
    descriptions: Descriptions
  }
  
  export interface Group {
    gid: number
    name: string
    code: string
    occupations: Occupation2[]
    showMore: boolean
  }
  
  export interface Occupation2 {
    occupationID: number
    name: string
    alias: string
    gender: string
    photo: string
    futureJob: boolean
    regulated: boolean
    avatar: string
    isNew: number
  }
  
  export interface Basics {
    id: number
    name: string
    full_name: string
    description: string
    other_gender: boolean
    avatar: string
    photo: string
    trend: number
    future_job: boolean
    group_name: string
    group_code: string
    groupID: number
    employers: boolean
    resources: boolean
    regulated: Regulated
    professionalStream: ProfessionalStream
  }
  
  export interface Regulated {
    value: boolean
    description: string
  }
  
  export interface ProfessionalStream {
    title: string
    URL: string
    image: string
  }
  
  export interface Skill {
    id: number
    name: string
    source: string[]
    description: string
  }
  
  export interface Similar {
    occupationID: number
    name: string
    alias: string
    gender: string
    photo: string
    futureJob: boolean
    regulated: boolean
    avatar: string
    isNew: number
    id: number
    similar: Similar2
  }
  
  export interface Similar2 {
    type: string
    name: string
  }
  
  export interface Building {
    id: number
    name: string
    image: string
  }
  
  export interface Subject {
    slug: string
    title: string
    level_variant: string
    level: Level
    description: string
  }
  
  export interface Level {
    label: string
    value: number
  }
  
  export interface Education {
    pathID: number
    occupationID: number
    duration: number
    durationText: string
    pathTypeID: number
    pathTypeName: string
    schools: School[]
  }
  
  export interface School {
    schoolID: number
    schoolName: string
    duration: number
    durationText: string
    durationExpected: string
    schoolType: string
    badge: string
    extra: boolean
    level: string
    selfLearned: boolean
  }
  
  export interface Statistics {
    error: any
    market: Market
    salary: Salary
  }
  
  export interface Market {
    value: string
    number: number
  }
  
  export interface Salary {
    value: string
    number: number
  }
  
  export interface Descriptions {
    tracks: string[]
    occupationID: number
    description: string
    descriptionShort: string
    benefits: string
    video: string
  }
  
  export interface Webmetadata {
    title: string
    cover: string
    description: string
  }
  